import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAnimal() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [animalData, setAnimalData] = useState({
    name: '',
    age: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Données à envoyer:', {
        ...animalData,
        owner: ownerId
      });

      const response = await axios.post('http://localhost:4000/api/animals', {
        ...animalData,
        owner: ownerId
      });

      console.log('Réponse du serveur:', response.data);

      if (response.data) {
        navigate(-1);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de l\'animal');
    }
  };

  return (
    <div className="search-container" style={{ backgroundColor: 'var(--accent-color)' }}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-box">
              <h1 className="search-title text-center mb-4" style={{ fontSize: '2rem' }}>Ajouter un animal</h1>

              {error && (
                <div className="alert alert-danger mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={animalData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Âge</label>
                  <input
                    type="number"
                    name="age"
                    value={animalData.age}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    value={animalData.type}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                    <option value="oiseau">Oiseau</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button 
                    type="button" 
                    onClick={() => navigate(-1)}
                    className="btn-action"
                    style={{ backgroundColor: 'var(--secondary-color)', minWidth: '120px' }}
                  >
                    Retour
                  </button>
                  <button 
                    type="submit" 
                    className="btn-action"
                    style={{ backgroundColor: 'var(--accent-color)', minWidth: '120px' }}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAnimal;
