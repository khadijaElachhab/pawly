import React from 'react';
import { Link } from 'react-router-dom';
import dogImage from '../assets/dog.png';

function AnimalCard({ animal }) {
  console.log('AnimalCard - animal:', animal);
  console.log('AnimalCard - animal._id:', animal?._id);

  if (!animal?._id) {
    console.error('AnimalCard - ID manquant pour l\'animal:', animal);
    return null;
  }

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body bg-light text-dark rounded">
        <div className="row">
          <div className="col-md-3">
            <img src={dogImage} alt="Animal" className="img-fluid rounded" />
          </div>
          <div className="col-md-9">
            <h5 className="card-title fw-bold">{animal.name}</h5>
            <p className="card-text">
              <strong>Type:</strong> {animal.type}<br />
              <strong>Âge:</strong> {animal.age} ans
            </p>
            <div className="d-flex gap-2">
              <Link 
                to={`/add-visit/${animal._id}`} 
                style={{
                  backgroundColor: '#FFD6D6',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Ajouter une visite
              </Link>
              <Link 
                to={`/editanimal/${animal._id}`} 
                style={{
                  backgroundColor: '#FFD6D6',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Modifier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;