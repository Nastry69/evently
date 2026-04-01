import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currentUser } from "../services/fakedb";
import { getEvent, toggleRegistration } from "../services/eventApi";
import type { Event } from "../types/Event";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadEvent() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        setError("Erreur de chargement de l’événement");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  async function handleToggleRegistration() {
    if (!id) return;

    try {
      setActionLoading(true);
      setError(null);
      setFeedback("");

      const result = await toggleRegistration(id);
      setEvent(result.updatedEvent);
      setFeedback(result.message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue");
      }
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error && !event) {
    return <p className="message error">{error}</p>;
  }

  if (!event) {
    return <p>Événement introuvable</p>;
  }

  const placesLeft = event.capacity - event.attendees.length;
  const isFull = placesLeft === 0;
  const isRegistered = event.attendees.some(
    (attendee) => attendee.id === currentUser.id
  );

  const formattedDate = new Date(event.date).toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <section className="details">
      <Link to="/" className="back-link">
        ← Retour à la liste
      </Link>

      <h2>{event.title}</h2>

      <p>
        <strong>Date :</strong> {formattedDate}
      </p>

      <p>
        <strong>Lieu :</strong> {event.location}
      </p>

      <p>
        <strong>Description :</strong> {event.description}
      </p>

      <p>
        <strong>Capacité :</strong> {event.capacity}
      </p>

      {placesLeft > 0 ? (
        <p>
          <strong>Places restantes :</strong> {placesLeft}
        </p>
      ) : (
        <p className="message error">Cet événement est complet.</p>
      )}

      <div className="tags">
        {event.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="actions">
        <button
          onClick={handleToggleRegistration}
          disabled={actionLoading || (!isRegistered && isFull)}
          className="btn-primary"
        >
          {actionLoading
            ? "Traitement..."
            : isRegistered
            ? "Se désinscrire"
            : "S’inscrire"}
        </button>
      </div>

      {feedback && <p className="message success">{feedback}</p>}
      {error && event && <p className="message error">{error}</p>}

      <div className="attendees-section">
        <h3>Liste des inscrits</h3>

        {event.attendees.length === 0 ? (
          <p>Aucun inscrit pour le moment.</p>
        ) : (
          <ul className="attendees-list">
            {event.attendees.map((attendee) => (
              <li key={attendee.id}>
                {attendee.fullName} — {attendee.team}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}