import axios from "axios";

const API_URL = "http://localhost:4000"; // Adresse du backend

// Requête pour récupérer tous les vétérinaires
export const getVeterinarians = async () => {
    try {
        const response = await axios.get(`${API_URL}/veterinarians`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des vétérinaires", error);
        return [];
    }
};
