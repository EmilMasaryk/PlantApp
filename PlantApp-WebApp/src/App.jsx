//import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabaseClient.js";

// --- 2. Plant Card Component ---
// This is a simple component that just knows how to display one plant.
// It receives its data as 'props'.
function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img
        //src={plant.img}
        src={`${import.meta.env.BASE_URL}${
          plant.img.startsWith("/") ? plant.img.substring(1) : plant.img
        }`}
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
        <p className="plant-card-description">{plant.description}</p>

        <div className="plant-card-tags">
          {/* This loops over your season array and makes a tag for each one */}
          {plant.season.map((s) => (
            <span className="plant-tag" key={s}>
              {s}
            </span>
          ))}

          {/* This is your original landscape tag */}
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

  const [plants, setPlants] = useState([]); // This will hold your plants
  const [loading, setLoading] = useState(true); // This tracks the "loading..." state

  // --- This hook fetches data from Supabase ---
  useEffect(() => {
    // This async function does the actual fetching
    async function getPlants() {
      // 'plants' is the name of your Supabase table
      const { data, error } = await supabase.from("plants").select("*");

      if (error) {
        console.warn(error); // Show any errors in the console
      } else if (data) {
        setPlants(data); // Put the loaded data into our 'plants' state
      }
      setLoading(false); // We're done loading
    }

    getPlants(); // Run the function
  }, []); // The empty [] means "run this only once when the page loads"

  // --- 5. Filter Logic ---
  // We create a *new* array of plants based on the current filter state.
  // This logic runs every time the component re-renders (i.e., when state changes).
  const filteredPlants = plants.filter((plant) => {
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
        <img
          src={`${import.meta.env.BASE_URL}LogoPlantApp.svg`}
          alt="PlantApp Logo"
          className="app-logo"
        />
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

      <div className="content-background-rectangle">
        {/* --- Plant Grid --- */}
        <div className="plant-grid">
          {/* --- ADD THIS LOADING CHECK --- */}
          {loading ? (
            <p className="no-results-message">Loading plants...</p>
          ) : filteredPlants.length > 0 ? (
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
    </div>
  );
}

export default App;
