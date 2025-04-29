import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddOwner = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("➡️ Formulaire soumis");

    try {
      const res = await fetch("http://localhost:4000/api/owners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, phone })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Propriétaire ajouté avec succès !");
        // Remet à zéro les champs
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
      } else {
        alert("❌ Erreur : " + (data.message || data.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du propriétaire :", error);
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--secondary-color)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div className="search-box">
          <h2 className="text-center mb-4">Ajouter un Propriétaire</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Prénom :</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nom :</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email :</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Téléphone :</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="btn-action"
                style={{ backgroundColor: 'var(--accent-color)', minWidth: '120px' }}
              >
                Retour
              </button>
              <button 
                type="submit" 
                className="btn-action"
                style={{ backgroundColor: 'var(--accent-color)', minWidth: '120px' }}
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOwner;

