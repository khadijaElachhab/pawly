import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OwnerCard from '../components/OwnerCard';

function SearchOwner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Veuillez entrer un nom de famille');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:4000/api/owners?lastname=${encodeURIComponent(searchTerm)}`);
      if (response.data && Array.isArray(response.data)) {
        setSearchResults(response.data);
        if (response.data.length === 0) {
          setError('Aucun propriétaire trouvé');
        }
      } else {
        throw new Error("Format de réponse invalide");
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError("Le nom de famille est requis pour la recherche.");
      } else if (err.response?.status === 404) {
        setError("Aucun propriétaire trouvé avec ce nom de famille.");
      } else {
        setError('Une erreur est survenue lors de la recherche');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="container">
        <h1 className="search-title mb-4">Rechercher un propriétaire</h1>

        <div className="search-box">
          <form onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                placeholder="Rechercher par nom de famille"
              />
              <button type="submit" className="search-button">
                Rechercher
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {searchResults.length > 0 && (
            <div className="mt-4">
              {searchResults.map(owner => (
                <OwnerCard key={owner._id} owner={owner} />
              ))}
            </div>
          )}
        </div>

        <p className="search-help-text">
          Utilisez le champ de recherche ci-dessus pour trouver un propriétaire ou
        </p>

        <Link to="/add-owner" className="add-owner-button">
          Ajouter un nouveau propriétaire
        </Link>
      </div>
    </div>
  );
}

export default SearchOwner;
