import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVisit() {
  const { animalId } = useParams();
  const navigate = useNavigate();

  // Liste statique des vétérinaires
  const veterinarians = [
    { _id: '1', name: 'Mr Derkaoui' },
    { _id: '2', name: 'Mme Bennani' },
    { _id: '3', name: 'Mr Lamrini' }
  ];

  const [visitData, setVisitData] = useState({
    date: '',
    diagnostique: '',
    veterinaire: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  // Vérification de l'ID de l'animal au chargement
  useEffect(() => {
    console.log('ID de l\'animal reçu:', animalId);
    if (!animalId) {
      console.error('ID de l\'animal manquant dans l\'URL');
      setMessage({ type: 'error', text: 'ID de l\'animal manquant. Veuillez retourner à la page précédente et réessayer.' });
      return;
    }
  }, [animalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Vérification des champs requis
    if (!visitData.date || !visitData.diagnostique || !visitData.veterinaire) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    if (!animalId) {
      setMessage({ type: 'error', text: 'ID de l\'animal manquant' });
      return;
    }

    console.log('=== Données avant envoi ===');
    console.log('Date:', visitData.date);
    console.log('Diagnostic:', visitData.diagnostique);
    console.log('Vétérinaire:', visitData.veterinaire);
    console.log('Animal ID:', animalId);

    try {
      const response = await axios.post('http://localhost:4000/api/visits/add', {
        date: visitData.date,
        diagnostique: visitData.diagnostique,
        animal: animalId,
        veterinaire: visitData.veterinaire
      });

      console.log('=== Réponse du serveur ===');
      console.log('Statut:', response.status);
      console.log('Données:', response.data);

      if (response.data) {
        setMessage({ type: 'success', text: 'Visite ajoutée avec succès !' });
        // Rediriger vers la page du propriétaire après 1.5 secondes
        setTimeout(() => {
          navigate(-1); // Retourne à la page précédente (page du propriétaire)
        }, 1500);
      }
    } catch (error) {
      console.error('=== Erreur lors de l\'ajout de la visite ===');
      console.error('Erreur complète:', error);
      console.error('Message d\'erreur:', error.message);
      console.error('Réponse d\'erreur:', error.response?.data);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de la visite' 
      });
    }
  };

  if (!animalId) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          <h4>Erreur</h4>
          <p>{message.text}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Ajouter une visite</h2>
            </div>

            <div className="card-body">
              {message.type === 'success' && (
                <div className="alert alert-success">{message.text}</div>
              )}
              {message.type === 'error' && (
                <div className="alert alert-danger">{message.text}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={visitData.date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Diagnostic</label>
                  <input
                    type="text"
                    name="diagnostique"
                    value={visitData.diagnostique}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vétérinaire</label>
                  <select
                    name="veterinaire"
                    value={visitData.veterinaire}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">-- Sélectionner un vétérinaire --</option>
                    {veterinarians.map(vet => (
                      <option key={vet._id} value={vet._id}>
                        {vet.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-action">
                  Ajouter la visite
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVisit;