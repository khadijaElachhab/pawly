import React, { useState } from 'react';

function AddAnimalForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    notes: ''
  });

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
        <label htmlFor="name" className="form-label">Nom de l'animal</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="species" className="form-label">Espèce</label>
        <input
          type="text"
          className="form-control"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="breed" className="form-label">Race</label>
        <input
          type="text"
          className="form-control"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Âge (en années)</label>
        <input
          type="number"
          className="form-control"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="weight" className="form-label">Poids (en kg)</label>
        <input
          type="number"
          className="form-control"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea
          className="form-control"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      
      <button type="submit" className="btn btn-warning fw-bold" disabled={isLoading}>
        {isLoading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}

export default AddAnimalForm;
