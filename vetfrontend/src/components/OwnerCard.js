import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OwnerCard({ owner }) {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('OwnerCard - owner:', owner);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Date invalide ou non définie';
    return date.toLocaleDateString('fr-FR');
  };

  const fetchAnimals = async () => {
    try {
      console.log('=== Début fetchAnimals ===');
      console.log('Owner ID:', owner._id);
      
      // Récupérer le propriétaire avec ses animaux populés
      const response = await axios.get(`http://localhost:4000/api/owners/${owner._id}`);
      console.log('Réponse du serveur:', response.data);
      
      if (response.data && response.data.animals) {
        console.log('Animaux reçus:', response.data.animals);
        // Vérifier si les animaux sont déjà populés
        if (response.data.animals.length > 0 && response.data.animals[0].name) {
          // Récupérer les visites pour chaque animal
          const animalsWithVisits = await Promise.all(
            response.data.animals.map(async (animal) => {
              try {
                console.log(`Tentative de récupération des visites pour l'animal ${animal._id}`);
                const visitsResponse = await axios.get(`http://localhost:4000/api/visits/${animal._id}/visits`);
                console.log(`Réponse des visites pour l'animal ${animal._id}:`, JSON.stringify(visitsResponse.data, null, 2));
                return {
                  ...animal,
                  visits: visitsResponse.data || []
                };
              } catch (err) {
                console.error(`Erreur récupération visites pour l'animal ${animal._id}:`, err);
                console.error('Détails de l\'erreur:', {
                  message: err.message,
                  response: err.response?.data,
                  status: err.response?.status
                });
                // En cas d'erreur, on retourne l'animal avec un tableau de visites vide
                return {
                  ...animal,
                  visits: []
                };
              }
            })
          );
          setAnimals(animalsWithVisits);
        } else {
          // Si ce sont des IDs, récupérer les détails
          const animalDetails = await Promise.all(
            response.data.animals.map(async (animalId) => {
              try {
                const animalResponse = await axios.get(`http://localhost:4000/api/animals/${animalId}`);
                try {
                  console.log(`Tentative de récupération des visites pour l'animal ${animalId}`);
                  const visitsResponse = await axios.get(`http://localhost:4000/api/visits/${animalId}/visits`);
                  console.log(`Réponse des visites pour l'animal ${animalId}:`, visitsResponse.data);
                  return {
                    ...animalResponse.data,
                    visits: visitsResponse.data || []
                  };
                } catch (err) {
                  console.error(`Erreur récupération visites pour l'animal ${animalId}:`, err);
                  console.error('Détails de l\'erreur:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                  });
                  return {
                    ...animalResponse.data,
                    visits: []
                  };
                }
              } catch (err) {
                console.error('Erreur récupération animal:', err);
                return null;
              }
            })
          );
          setAnimals(animalDetails.filter(animal => animal !== null));
        }
      } else {
        console.log('Aucun animal trouvé dans la réponse');
        setAnimals([]);
      }
    } catch (err) {
      console.error('=== Erreur dans fetchAnimals ===');
      console.error('Erreur complète:', err);
      console.error('Message d\'erreur:', err.message);
      console.error('Réponse d\'erreur:', err.response?.data);
      setError('Erreur lors de la récupération des animaux');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [owner._id]);

  return (
    <div className="card border-0 shadow-sm h-100 mb-3">
      <div className="card-body bg-light text-dark rounded">
        <h5 className="card-title fw-bold">{owner.firstName} {owner.lastName}</h5>
        <p className="card-text">
          <strong>Email:</strong> {owner.email}<br />
          <strong>Téléphone:</strong> {owner.phone}
        </p>

        <h6 className="fw-bold mt-3">Animaux :</h6>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : animals.length > 0 ? (
          animals.map((animal) => (
            <div key={animal._id} className="mb-3 ps-3 border-start border-3" style={{ borderColor: 'var(--accent-color)' }}>
              <p className="mb-1"><strong>Nom:</strong> {animal.name}</p>
              <p className="mb-1"><strong>Âge:</strong> {animal.age} ans</p>
              <p className="mb-2"><strong>Type:</strong> {animal.type}</p>

              <h6 className="fw-bold">Visites:</h6>
              {animal.visits && animal.visits.length > 0 ? (
                <ul className="list-unstyled">
                  {animal.visits.map((visit) => (
                    <li key={visit._id} className="mb-2 p-2 rounded" style={{ backgroundColor: 'var(--background-color)' }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <strong>Date:</strong> {formatDate(visit.date)}<br />
                          <strong>Diagnostic:</strong> {visit.diagnostique}
                        </div>
                        <div>
                          <strong>Vétérinaire:</strong> {visit.veterinaire}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Aucune visite ajoutée pour cet animal.</p>
              )}

              <div className="d-flex gap-2">
                <Link
                  to={`/edit-animal/${animal._id}`}
                  className="btn-action"
                >
                  Modifier l'animal
                </Link>
                <Link
                  to={`/add-visit/${animal._id}`}
                  className="btn-action"
                >
                  Ajouter une visite
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Aucun animal enregistré.</p>
        )}

        <div className="mt-4 d-flex gap-2">
          <Link 
            to={`/add-animal/${owner._id}`} 
            className="btn-action"
            style={{ backgroundColor: 'var(--accent-color)', color: 'var(--text-color)' }}
          >
            Ajouter un animal
          </Link>
          <Link 
            to={`/ownerdetails/${owner._id}`} 
            className="btn-action"
            style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OwnerCard;
