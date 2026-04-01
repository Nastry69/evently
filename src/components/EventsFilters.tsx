type EventsFiltersProps = { // Props de EventsFilters
  search: string;
  selectedTag: string;
  availableTags: string[];
  onSearchChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onReset: () => void;
};

export default function EventsFilters({ // Destructure les props de EventsFilters
  search,
  selectedTag,
  availableTags,
  onSearchChange,
  onTagChange,
  onReset,
}: EventsFiltersProps) { // Composant de filtres pour les événements
  return (
    <section className="filters"> 
      <div className="field"> 
        <label htmlFor="search">Recherche</label> 
        <input
          id="search"
          type="text"
          placeholder="Rechercher par titre ou lieu"
          value={search} // Valeur du champ de recherche
          onChange={(e) => onSearchChange(e.target.value)} // Appelle la fonction de changement de recherche lors de la saisie
        />
      </div>

      <div className="field">
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          value={selectedTag} // Valeur du champ de sélection de tag
          onChange={(e) => onTagChange(e.target.value)} // Appelle la fonction de changement de tag lors de la sélection
        >
          <option value="">Tous les tags</option>
          {availableTags.map((tag) => ( // Affiche les options de tags disponibles
            <option key={tag} value={tag}> 
              {tag}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="btn-secondary" onClick={onReset}> 
        Réinitialiser
      </button>
    </section>
  );
}