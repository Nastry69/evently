import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <Outlet /> 
      </main>
    </div>
  );
}