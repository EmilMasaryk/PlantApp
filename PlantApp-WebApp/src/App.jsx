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
    season: ["Summer"],
    landscape: "Forest",
    latinName: "Levandula angustifolia",
    describtion:
      "Lavender is a fragrant herb known for its beautiful purple flowers and calming scent. It is often used in aromatherapy, cooking, and as an ornamental plant in gardens.",
  },
  {
    id: 2,
    name: "Stinging Nettle",
    img: "Nettle.jpg",
    season: ["Spring", "Summer"],
    landscape: "Grassland",
    latinName: "Urtica dioicaia",
    describtion:
      "Stinging Nettle is a perennial plant known for its stinging hairs that can cause skin irritation. Despite this, it has been used for centuries in traditional recipes and as a nutritious food source when properly prepared.",
  },
  {
    id: 3,
    name: "Rose Hip",
    img: "/RoseHip.jpg",
    season: ["Autumn"],
    landscape: "Riverside",
    latinName: "Rosa canina L.",
    describtion:
      "Rose Hip is the fruit of the wild rose plant, typically red or orange in color. It is rich in vitamin C and has been used in traditional recipes for making jams, jellies, and herbal teas.",
  },
  {
    id: 4,
    name: "Sea Buckthorn",
    img: "/SeaBuckthorn.jpg",
    season: ["Autumn"],
    landscape: "Forest",
    latinName: "Hippophae rhamnoides",
    describtion:
      "Sea Buckthorn is a hardy shrub that produces bright orange berries. These berries are packed with nutrients and antioxidants, making them a popular ingredient in health foods, juices, and traditional recipes.",
  },
  {
    id: 5,
    name: "Plantago(Plantain)",
    img: "/Plantain.jpg",
    season: ["Summer", "Autumn"],
    landscape: "Grassland",
    latinName: "Plantago major",
    describtion:
      "Plantain is a common herbaceous plant known for its broad leaves and traditional purposes. It has been used in traditional recipes for its anti-inflammatory and wound-healing effects.",
  },
  {
    id: 6,
    name: "Peppermint",
    img: "/Mint.jpg",
    season: ["Summer"],
    landscape: "Riverside",
    latinName: "Mentha piperita",
    describtion:
      "Peppermint is a hybrid mint plant known for its refreshing aroma and flavor. It is widely used in traditional recipes, teas, and culinary dishes for its cooling sensation and potential digestive benefits .",
  },
  {
    id: 7,
    name: "Blueberry",
    img: "/Blueberry.jpg",
    season: ["Spring", "Summer", "Autumn"],
    landscape: "Grassland",
    latinName: "Vaccinium corymbosum",
    describtion:
      "Blueberry is a small, round fruit known for its sweet flavor and vibrant blue color. It is commonly used in traditional recipes, desserts, and smoothies, and is celebrated for its antioxidant properties.",
  },
  {
    id: 8,
    name: "Raspberry",
    img: "/raspberry.jpg",
    season: ["Summer"],
    landscape: "Grassland",
    latinName: "Rubus idaeus",
    describtion:
      "Raspberry is a popular fruit known for its sweet and tangy flavor. It is commonly used in traditional recipes, desserts, and jams, and is valued for its high vitamin C content and antioxidant properties.",
  },
  {
    id: 9,
    name: "Caraway(Cumin)",
    img: "/Caraway.jpg",
    season: ["Winter"],
    landscape: "Forest",
    latinName: "Carum carvi",
    describtion:
      "Caraway is a biennial plant known for its aromatic seeds, which are commonly used as a spice in traditional recipes. The seeds have a distinctive flavor and are often used in bread, cheese, and savory dishes.",
  },
];

// --- 2. Plant Card Component ---
// This is a simple component that just knows how to display one plant.
// It receives its data as 'props'.
function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img
        src={plant.img}
        alt={plant.name}
        className="plant-card-image"
        // This 'onError' is a fallback, in case an image is missing
        onError={(e) => {
          e.target.src =
            "https://placehold.co/300x200/eee/ccc?text=Image+Not+Found";
        }}
      />
      <div className="plant-card-content">
        <h3 className="plant-card-title">{plant.name}</h3>

        <p className="plant-card-subtitle">{plant.latinName}</p>
        <p className="plant-card-description">{plant.describtion}</p>

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
    // old -> const seasonMatch = seasonFilter === "All" || plant.season === seasonFilter;
    const seasonMatch =
      seasonFilter === "All" || plant.season.includes(seasonFilter);
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
