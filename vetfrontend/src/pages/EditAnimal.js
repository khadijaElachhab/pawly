import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditAnimal() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({
    name: '',
    age: '',
    type: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/animals/details/${animalId}`)
      .then(res => {
        console.log("Données reçues de l'API :", res.data);
        const animalData = res.data;
        if (animalData.breed && !animalData.type) {
          animalData.type = animalData.breed;
          delete animalData.breed;
        }
        setAnimal(animalData);
      })
      .catch(err => console.error("Erreur lors du chargement de l'animal", err));
  }, [animalId]);

  const handleChange = (e) => {
    console.log("Changement détecté :", e.target.name, e.target.value);
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées à l'API :", animal);
    const animalToUpdate = { ...animal };
    if (animalToUpdate.breed) {
      delete animalToUpdate.breed;
    }
    axios.put(`http://localhost:4000/api/animals/${animalId}`, animalToUpdate)
      .then(() => {
        setSuccessMessage("Animal modifié avec succès !");
        setTimeout(() => navigate(-1), 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour', err);
        setSuccessMessage("Erreur lors de la mise à jour");
      });
  };

  return (
    <div style={{ 
      backgroundColor: '#FFF176',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 className="text-center mb-4" style={{ color: '#333' }}>Modifier l'animal</h2>

          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="name"
                value={animal.name}
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
                value={animal.age}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                name="type"
                value={animal.type || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Sélectionner --</option>
                <option value="chien">Chien</option>
                <option value="chat">Chat</option>
                <option value="perroquet">Perroquet</option>
                <option value="hamster">Hamster</option>
              </select>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  backgroundColor: '#FFD6D6',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  color: '#333',
                  minWidth: '150px'
                }}
              >
                Retour
              </button>
              <button 
                type="submit" 
                style={{
                  backgroundColor: '#FFD6D6',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  color: '#333',
                  minWidth: '150px'
                }}
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAnimal;
