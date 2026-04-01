import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h2>Page introuvable</h2>
      <p>La page que vous recherchez n’existe pas.</p>

      <Link to="/" className="btn-link">
        Retour à l’accueil
      </Link>
    </section>
  );
}