import EventsListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CreateEventPage from "./pages/CreateEventPage";
import NotFoundPage from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<EventsListPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events/new" element={<CreateEventPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </main>
    </div>
  );
}