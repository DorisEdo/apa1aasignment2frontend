import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes"); // implicitly performing a GET as it has only one parameter

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const postRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: "Macadamia",
          ingredients: "macademia oil, olive oil, yoghurt",
          instructions: "combine ingredients in a bowl, apply to damp hair, cover and leave in for 15-20mins",
          category: "Deep Repair Mask",
          image_url: "test",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New recipe made!", data)
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const putRecipe = async (id) => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          title: "Coconut and Aloe Strengthening Conditioner",
          ingredients: "coconut oil, aloe vera, honey, olive oil, and apple cider vinegar",
          instructions: "mix all ingredients together",
          category: "trengthening Conditioner",
          image_url: " "
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Recipe updated!", data);
      setError(null);
      getRecipes(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Recipe deleted!", data);
      setError(null);
      getRecipes(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getRecipes();
    postRecipes();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      {loading && <p>Loading recipes...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <h2>Recipes:</h2>
          {recipes.length === 0 ? (
            <p>No recipes found</p>
          ) : (
            <ul>
              {recipes.map((recipe, index) => (
                <>
                  <li className="add-border" key={index}>
                    {recipe.title}
                  </li>
                  <li key={index}>{recipe.ingredients}</li>
                  <li key={index}>{recipe.instructions}</li>
                  <li key={index}>{recipe.category}</li>
                </>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
