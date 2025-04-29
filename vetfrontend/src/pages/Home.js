import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaHeart } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-container" style={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--primary-color)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Contenu principal */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        paddingBottom: '150px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <FaPaw style={{ fontSize: '3rem', color: 'white', marginRight: '1rem' }} />
                  <h1 className="home-title mb-0" style={{ color: 'white' }}>
                    PUPPY ADVENTURES INDOORS <FaHeart className="heart-icon" />
                  </h1>
                </div>
                <p className="home-subtitle" style={{ color: 'white', fontSize: '1.3rem' }}>
                  Des soins et activités adaptés pour vos compagnons.
                </p>
              </div>

              <div className="d-flex flex-column align-items-center gap-4">
                <Link 
                  to="/search-owner" 
                  className="main-button text-decoration-none"
                  style={{ fontSize: '1.2rem', padding: '1rem 3rem', width: '400px' }}
                >
                  Rechercher un propriétaire
                </Link>
                <Link 
                  to="/veterinarians" 
                  className="main-button secondary text-decoration-none"
                  style={{ fontSize: '1.2rem', padding: '1rem 3rem', width: '400px' }}
                >
                  Voir les vétérinaires
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image en bas */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
        <img 
          src="/images/pets-banner.png"
          alt="Animaux de compagnie"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            marginBottom: '-2px'
          }}
        />
      </div>
    </div>
  );
}

export default Home;

