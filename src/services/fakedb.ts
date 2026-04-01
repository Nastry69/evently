import type { Attendee, Event } from "../types/Event";

export const currentUser: Attendee = {
  id: "u1",
  fullName: "Tristan D.",
  team: "Tech",
};

export const sampleAttendees: Attendee[] = [
  { id: "u2", fullName: "Sonia Martin", team: "RH" },
  { id: "u3", fullName: "Lucas Bernard", team: "Tech" },
  { id: "u4", fullName: "Camille Robert", team: "Marketing" },
  { id: "u5", fullName: "Nina Petit", team: "Finance" },
];

export const initialEvents: Event[] = [
  {
    id: "local-1",
    title: "Afterwork de rentrée",
    description: "Moment convivial entre collègues pour lancer la rentrée.",
    date: "2026-09-15T18:30:00.000Z",
    location: "Lyon",
    capacity: 20,
    attendees: [sampleAttendees[0], sampleAttendees[1]],
    tags: ["Afterwork", "RH"],
  },
  {
    id: "local-2",
    title: "Formation React débutant",
    description: "Session d’initiation à React pour les nouveaux arrivants.",
    date: "2026-06-10T09:00:00.000Z",
    location: "Paris",
    capacity: 2,
    attendees: [sampleAttendees[2], sampleAttendees[3]],
    tags: ["Formation", "Tech"],
  },
  {
    id: "local-3",
    title: "Réunion d’information QVT",
    description: "Présentation des actions bien-être et qualité de vie au travail.",
    date: "2026-04-18T12:00:00.000Z",
    location: "Visio",
    capacity: 30,
    attendees: [],
    tags: ["RH"],
  },
  {
    id: "local-4",
    title: "Atelier cybersécurité",
    description: "Bonnes pratiques pour renforcer la sécurité numérique au travail.",
    date: "2026-05-07T10:00:00.000Z",
    location: "Marseille",
    capacity: 15,
    attendees: [sampleAttendees[1], sampleAttendees[3]],
    tags: ["Tech", "Formation"],
  },
  {
    id: "local-5",
    title: "Petit-déjeuner onboarding",
    description: "Accueil des nouveaux collaborateurs avec les managers.",
    date: "2026-03-25T08:30:00.000Z",
    location: "Lille",
    capacity: 4,
    attendees: [
      sampleAttendees[0],
      sampleAttendees[1],
      sampleAttendees[2],
      sampleAttendees[3],
    ],
    tags: ["RH"],
  },
  {
    id: "local-6",
    title: "Conférence innovation interne",
    description: "Partage de projets et d’initiatives portés par les équipes.",
    date: "2026-11-20T14:00:00.000Z",
    location: "Bordeaux",
    capacity: 25,
    attendees: [sampleAttendees[2], sampleAttendees[3]],
    tags: ["Tech", "Afterwork"],
  },
];