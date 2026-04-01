import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventApi";

type FormErrors = {
  title?: string;
  date?: string;
  location?: string;
  capacity?: string;
  description?: string;
};

export default function CreateEventPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(10);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  function validate() {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Le titre est obligatoire.";
    }

    if (!date) {
      newErrors.date = "La date est obligatoire.";
    }

    if (!location.trim()) {
      newErrors.location = "Le lieu est obligatoire.";
    }

    if (capacity <= 0) {
      newErrors.capacity = "La capacité doit être supérieure à 0.";
    }

    if (!description.trim()) {
      newErrors.description = "La description est obligatoire.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      setGlobalError("");

      const formattedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      await createEvent({
        title,
        date,
        location,
        capacity,
        description,
        tags: formattedTags,
      });

      navigate("/");
    } catch (err) {
      setGlobalError("Impossible de créer l’événement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Créer un événement</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="date">Date et heure</label>
          <input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className="field-error">{errors.date}</p>}
        </div>

        <div className="field">
          <label htmlFor="location">Lieu</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <p className="field-error">{errors.location}</p>}
        </div>

        <div className="field">
          <label htmlFor="capacity">Capacité</label>
          <input
            id="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
          {errors.capacity && <p className="field-error">{errors.capacity}</p>}
        </div>

        <div className="field">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            placeholder="Ex: Afterwork, RH, Tech"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="field-error">{errors.description}</p>
          )}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Création..." : "Créer l’événement"}
        </button>

        {globalError && <p className="message error">{globalError}</p>}
      </form>
    </section>
  );
}