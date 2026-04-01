import { Link } from "react-router-dom";
import type { Event } from "../types/Event";

// Props de l'EventCard
type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const placesLeft = event.capacity - event.attendees.length; // Vérifie si l'événement est complet
  const isFull = placesLeft === 0; // Vérifie si l'événement est égal à 0

  // Formate la date de l'événement pour l'affichage en français
  const formattedDate = new Date(event.date).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className={`card ${isFull ? "card-full" : ""}`}> 
      <div className="card-top">
        <h2>{event.title}</h2>
        {isFull && <span className="badge badge-danger">Complet</span>} 
      </div>

      <p>
        <strong>Date :</strong> {formattedDate} 
      </p>

      <p>
        <strong>Lieu :</strong> {event.location} 
      </p>


      {placesLeft > 0 && (
        <p>
          <strong>Places restantes :</strong> {placesLeft} 
        </p>
      )}

      <div className="tags">
        {event.tags.map((tag) => (
          <span key={tag} className="tag"> 
            {tag}
          </span>
        ))}
      </div>

      <Link to={`/events/${event.id}`} className="btn-link">
        Voir le détail
      </Link>
    </article>
  );
}