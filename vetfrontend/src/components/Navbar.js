import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaHeart } from 'react-icons/fa';
import { scrollToFooter } from './Footer';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: 'var(--primary-color)',
      padding: '1rem 0'
    }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="d-flex align-items-center">
            <FaPaw style={{ marginRight: '0.5rem', fontSize: '1.5rem', color: 'white' }} />
            <span style={{ 
              fontSize: '1.5rem', 
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              color: 'white'
            }}>PAWLY</span>
            <FaHeart style={{ 
              marginLeft: '0.5rem', 
              fontSize: '1.2rem', 
              color: '#FFD6D6'
            }} />
          </div>
        </Link>
        <div className="d-flex gap-4">
          <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            Accueil
          </Link>
          <Link to="/search-owner" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            Rechercher
          </Link>
          <Link to="/add-owner" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            Ajouter propriétaire
          </Link>
          <Link to="/veterinarians" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            Vétérinaires
          </Link>
          <button 
            onClick={scrollToFooter}
            style={{ 
              background: 'none',
              border: 'none',
              color: 'var(--text-color)',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'none'
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

