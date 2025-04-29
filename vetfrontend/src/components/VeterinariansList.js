import React, { useEffect, useState } from 'react';

function VeterinariansList() {
    const [veterinarians, setVeterinarians] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/veterinarians') // L'URL de ton backend
            .then((response) => response.json())
            .then((data) => {
                setVeterinarians(data); // Sauvegarde les vétérinaires dans l'état
            })
            .catch((error) => console.error('Erreur:', error));
    }, []); // Ne s'exécute qu'une seule fois au chargement du composant

    return (
        <div>
            <h2>Liste des Vétérinaires</h2>
            <ul>
                {veterinarians.length > 0 ? (
                    veterinarians.map((veterinarian) => (
                        <li key={veterinarian._id}>
                            {veterinarian.firstName} {veterinarian.lastName} - {veterinarian.specialty}
                        </li>
                    ))
                ) : (
                    <li>Aucun vétérinaire disponible</li>
                )}
            </ul>
        </div>
    );
}

export default VeterinariansList;
