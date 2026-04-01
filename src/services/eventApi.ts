import type { Attendee, CreateEventInput, Event } from "../types/Event";
import { currentUser, initialEvents } from "./fakedb";

type HolidayDto = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  types: string[];
};

const URL = "https://date.nager.at/api/v3/PublicHolidays/2026/FR";

const LOCAL_EVENTS_KEY = "evently_local_events";
const REGISTRATIONS_KEY = "evently_registrations";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toEvent(h: HolidayDto): Event {
  const iso = new Date(`${h.date}T09:00:00`).toISOString();

  return {
    id: h.date,
    title: h.localName,
    description: `${h.name} (jour férié)`,
    date: iso,
    location: "France (national)",
    capacity: 50,
    attendees: [],
    tags: h.types,
  };
}

function readLocalEvents(): Event[] {
  const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
  if (!raw) return initialEvents;

  try {
    return JSON.parse(raw) as Event[];
  } catch {
    return initialEvents;
  }
}

function saveLocalEvents(events: Event[]) {
  localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
}

function readRegistrations(): Record<string, Attendee[]> {
  const raw = localStorage.getItem(REGISTRATIONS_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, Attendee[]>;
  } catch {
    return {};
  }
}

function saveRegistrations(registrations: Record<string, Attendee[]>) {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

function mergeRegistrations(events: Event[]): Event[] {
  const registrations = readRegistrations();

  return events.map((event) => ({
    ...event,
    attendees: registrations[event.id] ?? event.attendees ?? [],
  }));
}

export async function getEvents(): Promise<Event[]> {
  const localEvents = readLocalEvents();

  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des événements API.");
  }

  const holidays: HolidayDto[] = await res.json();
  const apiEvents = holidays.map(toEvent);

  const allEvents = [...localEvents, ...apiEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return mergeRegistrations(allEvents);
}

export async function getEvent(id: string): Promise<Event> {
  const events = await getEvents();
  const event = events.find((e) => e.id === id);

  if (!event) {
    throw new Error("Événement introuvable");
  }

  return event;
}

export async function toggleRegistration(eventId: string): Promise<{
  updatedEvent: Event;
  message: string;
}> {
  await delay(300);

  const events = await getEvents();
  const targetEvent = events.find((event) => event.id === eventId);

  if (!targetEvent) {
    throw new Error("Événement introuvable");
  }

  const registrations = readRegistrations();
  const attendees = registrations[eventId] ?? targetEvent.attendees ?? [];

  const isAlreadyRegistered = attendees.some(
    (attendee) => attendee.id === currentUser.id
  );

  let updatedAttendees: Attendee[];
  let message: string;

  if (isAlreadyRegistered) {
    updatedAttendees = attendees.filter((attendee) => attendee.id !== currentUser.id);
    message = "Désinscription effectuée avec succès.";
  } else {
    const placesLeft = targetEvent.capacity - attendees.length;

    if (placesLeft <= 0) {
      throw new Error("Cet événement est complet.");
    }

    updatedAttendees = [...attendees, currentUser];
    message = "Inscription effectuée avec succès.";
  }

  registrations[eventId] = updatedAttendees;
  saveRegistrations(registrations);

  const updatedEvent: Event = {
    ...targetEvent,
    attendees: updatedAttendees,
  };

  return { updatedEvent, message };
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
  await delay(400);

  const newEvent: Event = {
    id: `local-created-${Date.now()}`,
    title: input.title,
    description: input.description,
    date: new Date(input.date).toISOString(),
    location: input.location,
    capacity: input.capacity,
    attendees: [],
    tags: input.tags,
  };

  const localEvents = readLocalEvents();
  const updatedLocalEvents = [...localEvents, newEvent];
  saveLocalEvents(updatedLocalEvents);

  return newEvent;
}