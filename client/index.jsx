import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image_url: ""
  });
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all recipes
  const getRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new or updated recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const method = form.id ? "PUT" : "POST";

      const response = await fetch("/api/recipes", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      setForm({
        id: null,
        title: "",
        ingredients: "",
        instructions: "",
        category: "",
        image_url: ""
      });
      getRecipes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Populate form to edit
  const handleEdit = (recipe) => {
    setForm(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete recipe
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete");
      getRecipes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = filter
    ? recipes.filter((r) => r.category?.toLowerCase() === filter.toLowerCase())
    : recipes;

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="container">
      <h1>🌿 Natural Hair Recipe App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h2>{form.id ? "Edit Recipe" : "Add a New Recipe"}</h2>

        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Ingredients</label>
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required />

        <label>Instructions</label>
        <textarea name="instructions" value={form.instructions} onChange={handleChange} required />

        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <label>Image URL</label>
        <input name="image_url" value={form.image_url} onChange={handleChange} />

        {form.image_url && (
          <img
            src={form.image_url}
            alt="Preview"
            style={{ maxWidth: "100%", marginBottom: "1rem", borderRadius: "8px" }}
          />
        )}

        <button type="submit">{form.id ? "Update Recipe" : "Add Recipe"}</button>
      </form>

      {/* Filters */}
      <div style={{ marginTop: "2rem" }}>
        <label><strong>Filter by Category:</strong></label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">-- All --</option>
          <option value="Moisturising">Moisturising</option>
          <option value="Growth">Growth</option>
          <option value="Deep Repair Mask">Deep Repair Mask</option>
          <option value="Cleansing">Cleansing</option>
          <option value="Styling">Styling</option>
        </select>
      </div>

      {/* Status */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {/* Recipes */}
      <h2 style={{ marginTop: "2rem" }}>Recipes:</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <h3>{recipe.title}</h3>
            {recipe.image_url && (
              <img src={recipe.image_url} alt={recipe.title} style={{ width: "100%", borderRadius: "8px" }} />
            )}
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Category:</strong> {recipe.category}</p>

            <div className="recipe-actions">
              <button className="edit-btn" onClick={() => handleEdit(recipe)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

