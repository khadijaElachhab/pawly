import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditOwner() {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/owners/${ownerId}`)
      .then((res) => setOwner(res.data))
      .catch((err) => console.error("Erreur axios :", err));
  }, [ownerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/owners/${ownerId}`, owner)
      .then((res) => {
        setMessage(res.data.message);  // message depuis le backend
        setTimeout(() => {
          navigate(`/ownerdetails/${ownerId}`);
        }, 1500);
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour :", err);
        setMessage("Une erreur est survenue lors de la mise à jour.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Modifier le propriétaire</h2>
      {message && (
        <div className={`alert ${message.includes("erreur") ? "alert-danger" : "alert-success"}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input type="text" className="form-control" name="firstName" value={owner.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" name="lastName" value={owner.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={owner.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input type="text" className="form-control" name="phone" value={owner.phone} onChange={handleChange} required />
        </div>

        <button 
          type="submit" 
          className="btn"
          style={{
            backgroundColor: '#FFD6D6',
            color: '#333',
            borderRadius: '25px',
            padding: '0.75rem 1.5rem',
            border: 'none',
            fontWeight: 'bold',
            minWidth: '220px',
            fontSize: '1.1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
            marginBottom: '2rem'
          }}
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

export default EditOwner;
