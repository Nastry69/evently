# Evently

Mini-SaaS de gestion d’événements réalisé avec React + TypeScript.

## Lancer le projet

```bash
npm install
npm run dev

Choix techniques
React avec composants fonctionnels
TypeScript pour typer les props, états et modèles
React Router DOM pour la navigation
useState pour la gestion d’état local
useEffect pour le chargement initial des données
fetch pour consommer l’API publique Nager.Date
localStorage pour conserver :
les événements créés localement
les inscriptions / désinscriptions
Fonctionnalités
affichage de la liste des événements
tri par date croissante
recherche texte
filtre par tag
détail d’un événement
inscription / désinscription
création d’événement
Limites
l’API Nager.Date ne gère pas les inscriptions ni la création d’événements
la création et les inscriptions sont simulées côté front
pas d’authentification réelle
pas de backend

---

## 13) Installation nécessaire

Si ce n’est pas déjà fait :

```bash
npm install react-router-dom
14) Arborescence finale
src/
  components/
    EventCard.tsx
    EventsFilters.tsx
  pages/
    CreateEventPage.tsx
    EventDetailsPage.tsx
    EventsListPage.tsx
  services/
    eventApi.ts
    fakeDb.ts
  types/
    event.ts
  App.tsx
  main.tsx
  index.css