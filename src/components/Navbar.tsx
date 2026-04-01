import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="app-header">
      <div>
        <Link to="/" className="brand">
          <h1>Evently</h1>
        </Link>
        <p>Mini-SaaS de gestion d’événements</p>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Événements
        </NavLink>

        <NavLink
          to="/events/new"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Créer un événement
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          A propos
        </NavLink>
      </nav>
    </header>
  );
}