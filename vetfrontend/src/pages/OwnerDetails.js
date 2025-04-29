import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OwnerDetails() {
  const { ownerId } = useParams(); // Utilisation de ownerId depuis l'URL
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerId) {
      console.log("Nom du propriétaire depuis l'URL :", ownerId);
      axios.get(`http://localhost:4000/api/owners/${ownerId}`)
        .then((res) => {
          console.log("Réponse du backend :", res.data);
          setOwner(res.data);
        })
        .catch((err) => {
          console.error("Erreur axios lors de la récupération des données :", err);
        });
    }
  }, [ownerId]);

  const handleDelete = () => {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce propriétaire ?');
    if (isConfirmed) {
      console.log("Tentative de suppression de :", `http://localhost:4000/api/owners/${ownerId}`);
      axios.delete(`http://localhost:4000/api/owners/${ownerId}`)
        .then((res) => {
          console.log('Réponse de la suppression :', res.data);
          if (res.data.message === 'Propriétaire supprimé avec succès') {
            alert('Propriétaire supprimé');
            navigate('/'); // Redirige vers la page d'accueil après suppression
          } else {
            alert('Échec de la suppression');
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression :", err);
          alert('Une erreur est survenue lors de la suppression');
        });
    }
  };

  const handleEdit = () => {
    navigate(`/edit-owner/${ownerId}`); // Redirige vers la page d'édition du propriétaire
  };

  if (!owner) return <div>Chargement...</div>;

  return (
    <div style={{ backgroundColor: 'var(--secondary-color)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="search-box">
          <h2 className="search-title text-center mb-4">Détails du propriétaire</h2>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">{owner.firstName} {owner.lastName}</h3>
              <p className="card-text mb-3">
                <strong>Email:</strong> {owner.email}
              </p>
              <p className="card-text mb-4">
                <strong>Téléphone:</strong> {owner.phone}
              </p>
              <div className="d-flex justify-content-between mt-4">
                <button 
                  onClick={() => navigate(-1)} 
                  className="btn-action"
                  style={{ backgroundColor: 'var(--accent-color)', minWidth: '120px' }}
                >
                  Retour
                </button>
                <div className="d-flex gap-3">
                  <button 
                    onClick={handleEdit} 
                    className="btn-action"
                    style={{ 
                      backgroundColor: '#FFD6D6',
                      minWidth: '120px',
                      borderRadius: '25px',
                      padding: '0.75rem 1.5rem',
                      color: 'white',
                      border: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="btn-action"
                    style={{ backgroundColor: 'var(--secondary-color)', minWidth: '120px' }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;
