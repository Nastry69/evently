# Evently

Mini-SaaS de gestion d’événements réalisé avec React + TypeScript.

## Lancer le projet

```bash
npm install
npm run dev
```

## Choix techniques
React avec composants fonctionnels
TypeScript pour typer les props, états et modèles
React Router DOM pour la navigation entre pages
useState pour la gestion d’état local
useEffect pour le chargement initial des données
fetch pour consommer l’API publique Nager.Date
localStorage pour conserver :
les événements créés localement
les inscriptions / désinscriptions simulées
Fonctionnalités liées au routing

L’application utilise React Router DOM pour mettre en place une navigation en plusieurs pages sans rechargement complet.

### Routes disponibles
/ : page d’accueil affichant la liste des événements
/event/:id : page de détail d’un événement
/create : page de création d’un événement
/about : page statique ajoutée pour s’entraîner au routing
Layout : composant de structure commun contenant la navigation et le rendu des pages via <Outlet />
Ce que cela permet
naviguer entre plusieurs pages
utiliser des URLs claires
afficher une interface plus structurée
séparer les responsabilités entre les pages
mettre en place un layout réutilisable
### Fonctionnalités
Gestion des événements
affichage de la liste des événements
tri par date croissante
recherche textuelle
filtre par tag
compteur dynamique : X affichés / Y total
Détail d’un événement
consultation d’une page dédiée
affichage des informations complètes d’un événement
Inscription / désinscription
simulation d’inscription à un événement
simulation de désinscription
persistance de l’état dans le localStorage
Création d’événement
formulaire de création d’événement
ajout dynamique à la liste
stockage local sans backend
Rendu conditionnel
affichage d’un état de chargement
affichage d’un message d’erreur
affichage conditionnel de certains éléments de l’interface
affichage du compteur uniquement si des événements existent

## API utilisée
API publique : Nager.Date

Cette API est utilisée pour récupérer des données d’événements à afficher dans l’application.

Limites de l’API
elle ne permet pas la création d’événements
elle ne gère pas les inscriptions utilisateurs

Pour cette raison, certaines fonctionnalités sont simulées côté front.

📁 Arborescence du projet
src/
  components/
    EventCard.tsx
    EventsFilters.tsx
    Layout.tsx
  pages/
    AboutPage.tsx
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

## Installation nécessaire

Si ce n’est pas déjà fait :

```
npm install react-router-dom
```

À travers ce projet, j’ai pu pratiquer :

la mise en place d’un routing avec React Router
l’utilisation d’un Layout avec <Outlet />
le rendu conditionnel en React
le typage des données avec TypeScript
la gestion d’état local avec useState
le chargement de données avec useEffect
la consommation d’une API externe avec fetch
la persistance de données avec localStorage
l’organisation d’un projet React en composants, pages, services et types
##Limites du projet
pas d’authentification réelle
pas de backend
pas de base de données distante
création et inscriptions simulées côté front
données non partagées entre plusieurs utilisateurs
persistance uniquement sur le navigateur local
## Pistes d’amélioration
ajout d’un backend
authentification utilisateur
base de données réelle
gestion complète des utilisateurs
ajout de tests
amélioration du design et de l’expérience utilisateur
validation plus poussée des formulaires
gestion avancée des erreurs API
## Auteur

Projet réalisé dans le cadre de ma formation en développement web Full Stack.