import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/recipes'); // implicitly performing a GET as it has only one parameter
        
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

    fetchRecipes();
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
                <li className='add-border' key={index}>{recipe.title}</li>
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);