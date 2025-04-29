import React, { useState, useEffect } from 'react';

function AddOwnerForm({ onSubmit, isLoading, initialData = null }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Si des données initiales sont fournies (pour la modification), les utiliser
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">Prénom</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Nom</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Téléphone</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Adresse</label>
        <textarea
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      
      <button type="submit" className="btn btn-warning fw-bold" disabled={isLoading}>
        {isLoading ? 'Enregistrement...' : initialData ? 'Mettre à jour' : 'Enregistrer'}
      </button>
    </form>
  );
}

export default AddOwnerForm;
