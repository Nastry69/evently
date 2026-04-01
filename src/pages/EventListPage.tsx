import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import EventsFilters from "../components/EventsFilters";
import { getEvents } from "../services/eventApi";
import type { Event } from "../types/Event";

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError(null);

        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const availableTags = useMemo(() => {
    const allTags = events.flatMap((event) => event.tags);
    return [...new Set(allTags)].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      const matchesTag =
        selectedTag === "" || event.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [events, search, selectedTag]);

  function handleReset() {
    setSearch("");
    setSelectedTag("");
  }

  return (
    <section>
      <div className="page-title">
        <h2>Liste des événements</h2>

        {!loading && !error && events.length > 0 && (
          <p>
            {filteredEvents.length} / {events.length} évènement(s)
          </p>
        )}
      </div>

      {!loading && !error && events.length > 0 && (
        <EventsFilters
          search={search}
          selectedTag={selectedTag}
          availableTags={availableTags}
          onSearchChange={setSearch}
          onTagChange={setSelectedTag}
          onReset={handleReset}
        />
      )}

      {loading && <p>Loading…</p>}

      {error && <p className="message error">{error}</p>}

      {!loading && !error && events.length === 0 && <p>Aucun événement</p>}

      {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
        <p>Aucun événement ne correspond à votre recherche.</p>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <div className="grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}