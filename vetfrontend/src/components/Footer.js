import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const scrollToFooter = () => {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer"
      style={{
        backgroundColor: 'var(--secondary-color)',
        padding: '2rem 0',
        marginTop: 'auto',
        color: '#333',
        width: '100%'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-2">
                <FaPhone size={20} />
                <span>0716802866</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope size={20} />
                <span>DOUAA.BRAHIMI.ESTN24@ump.ac.ma</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={20} />
                <span>ESTN, BP:1458, Nador 62000</span>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <p className="mb-0">
              © {new Date().getFullYear()} PAWLY. Tous droits réservés.
            </p>
            <p className="mb-0">
              Développé par Douae Brahimi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export const scrollToFooter = () => {
  document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
};