import React from "react";
import { Link } from "react-router-dom";

const Veterinarians = () => {
  // Liste statique des vétérinaires
  const veterinarians = [
    { firstName: "Mohamed", lastName: "Derkaoui", specialty: "Chirurgien vétérinaire", email: "Derkaoui@gmail.com", phone: "0123456789" },
    { firstName: "Safaa", lastName: "Bennani", specialty: "Médecine vétérinaire", email: "Bennani@gmail.com", phone: "0987654321" },
    { firstName: "Ali", lastName: "Lamrini", specialty: "Dermatologie vétérinaire", email: "Lamrini@gmail.com", phone: "0147258369" }
  ];

  console.log("Vétérinaires list loaded"); // Log pour vérifier que la page se charge

  return (
    <div style={{ 
      backgroundColor: '#FFF176',
      minHeight: '100vh',
      padding: '2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="search-box" style={{ 
          width: '100%',
          maxWidth: '1000px', 
          margin: '0 144px',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          position: 'relative'
        }}>
          <h1 className="text-center mb-5" style={{ 
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: '600'
          }}>Nos Vétérinaires</h1>
          
          {/* Tableau des vétérinaires */}
          <div className="table-responsive">
            <table className="table" style={{ marginBottom: '2rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#FFD6D6' }}>
                  <th style={{ padding: '1rem', border: 'none' }}>Prénom</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Nom</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Spécialité</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Email</th>
                  <th style={{ padding: '1rem', border: 'none' }}>Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {veterinarians.map((vet, index) => (
                  <tr key={index}>
                    <td style={{ padding: '1rem', border: 'none' }}>{vet.firstName}</td>
                    <td style={{ padding: '1rem', border: 'none' }}>{vet.lastName}</td>
                    <td style={{ padding: '1rem', border: 'none' }}>{vet.specialty}</td>
                    <td style={{ padding: '1rem', border: 'none' }}>{vet.email}</td>
                    <td style={{ padding: '1rem', border: 'none' }}>{vet.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Boutons pour redirection */}
          <div className="d-flex justify-content-between mt-4">
            <Link 
              to="/" 
              className="btn"
              style={{ 
                backgroundColor: '#FFD6D6',
                minWidth: '150px',
                borderRadius: '25px',
                padding: '0.75rem 2rem',
                color: '#333',
                textDecoration: 'none',
                border: 'none',
                fontSize: '1.1rem',
                textAlign: 'center'
              }}
            >
              Retour
            </Link>
            <Link 
              to="/add-owner" 
              className="btn"
              style={{ 
                backgroundColor: '#FFD6D6',
                minWidth: '250px',
                borderRadius: '25px',
                padding: '0.75rem 2rem',
                color: '#333',
                textDecoration: 'none',
                border: 'none',
                fontSize: '1.1rem',
                textAlign: 'center'
              }}
            >
              Ajouter un propriétaire
            </Link>
          </div>
        </div>

        {/* Image du chien */}
        <div style={{
          position: 'absolute',
          right: '-145px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '300px',
          height: 'auto'
        }}>
          <img 
            src="/images/bgra-removebg-preview.png"
            alt="Chien"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Veterinarians;
