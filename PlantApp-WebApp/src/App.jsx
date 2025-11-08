import React, { useState } from "react";
import "./App.css";

// --- 1. Mock Data ---
// In a real app, you'd get this from a database. For a prototype,
// a simple array of objects is perfect.
const ALL_PLANTS = [
  {
    id: 1,
    name: "English Lavender",
    img: "/Lavender.jpg",
    season: "Spring",
    landscape: "Forest",
  },
  {
    id: 2,
    name: "Stinging Nettle",
    img: "Nettle.jpg",
    season: "Spring",
    landscape: "Grassland",
  },
  {
    id: 3,
    name: "Rose Hip",
    img: "/RoseHip.jpg",
    season: "Summer",
    landscape: "Riverside",
  },
  {
    id: 4,
    name: "Sea Buckthorn",
    img: "/SeaBuckthorn.jpg",
    season: "Autumn",
    landscape: "Forest",
  },
  {
    id: 5,
    name: "Plantago(Plantain)",
    img: "/Plantain.jpg",
    season: "Autumn",
    landscape: "Grassland",
  },
  {
    id: 6,
    name: "Peppermint",
    img: "/Mint.jpg",
    season: "Summer",
    landscape: "Riverside",
  },
  {
    id: 7,
    name: "Blueberry",
    img: "/Blueberry.jpg",
    season: "Spring",
    landscape: "Grassland",
  },
  {
    id: 8,
    name: "Raspberry",
    img: "/raspberry.jpg",
    season: "Winter",
    landscape: "Grassland",
  },
  {
    id: 9,
    name: "Caraway(Cumin)",
    img: "/Caraway.jpg",
    season: "Winter",
    landscape: "Forest",
  },
];

// --- 2. Plant Card Component ---
// This is a simple component that just knows how to display one plant.
// It receives its data as 'props'.
function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img src={plant.img} alt={plant.name} className="plant-card-image" />
      <div className="plant-card-content">
        <h3 className="plant-card-title">{plant.name}</h3>
        <div className="plant-card-tags">
          <span className="plant-tag">{plant.season}</span>
          <span className="plant-tag">{plant.landscape}</span>
        </div>
      </div>
    </div>
  );
}

// --- 3. Main App Component ---
// This is your main "Encyclopedia Page".
function App() {
  // --- 4. State ---
  // We use 'useState' to store the *current* values of the filters.
  // 'All' is the default value.
  const [seasonFilter, setSeasonFilter] = useState("All");
  const [landscapeFilter, setLandscapeFilter] = useState("All");

  // --- 5. Filter Logic ---
  // We create a *new* array of plants based on the current filter state.
  // This logic runs every time the component re-renders (i.e., when state changes).
  const filteredPlants = ALL_PLANTS.filter((plant) => {
    // Check for season match
    const seasonMatch = seasonFilter === "All" || plant.season === seasonFilter;
    // Check for landscape match
    const landscapeMatch =
      landscapeFilter === "All" || plant.landscape === landscapeFilter;
    // Return true only if *both* match
    return seasonMatch && landscapeMatch;
  });

  // --- 6. JSX to Render ---
  // This is what the user sees.
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PlantApp</h1>
        <p>
          A Foraging guide for learning about wild plants in different seasons
          and ladscapes.
        </p>
      </header>

      {/* --- Filter Controls --- */}
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="season-filter">Filter by Season</label>
          <select
            id="season-filter"
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
          >
            <option value="All">All Seasons</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="landscape-filter">Filter by Landscape</label>
          <select
            id="landscape-filter"
            value={landscapeFilter}
            onChange={(e) => setLandscapeFilter(e.target.value)}
          >
            <option value="All">All Landscapes</option>
            <option value="Forest">Forest</option>
            <option value="Grassland">Grassland</option>
            <option value="Riverside">Riverside</option>
          </select>
        </div>
      </div>

      {/* --- Plant Grid --- */}
      <div className="plant-grid">
        {/* We map over the 'filteredPlants' array.
          If there are no plants, we show a message.
        */}
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))
        ) : (
          <p className="no-results-message">
            No plants match your current filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
