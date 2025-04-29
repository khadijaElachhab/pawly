import Visit from '../models/Visit.js';
import Animal from '../models/animal.js';
import mongoose from 'mongoose';

// Tableau statique des vétérinaires
const veterinarians = [
    { _id: '1', name: 'Mr Derkaoui' },
    { _id: '2', name: 'Mme Bennani' },
    { _id: '3', name: 'Mr Lamrini' }
];

const addVisit = async (req, res) => {
    try {
        console.log("=== Nouvelle requête d'ajout de visite ===");
        console.log("Headers:", req.headers);
        console.log("Body reçu:", JSON.stringify(req.body, null, 2));

        // Extraction des données
        const { date, diagnostique, animal, veterinaire } = req.body;

        // Vérification que l'ID de l'animal est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(animal)) {
            console.log("ID d'animal invalide:", animal);
            return res.status(400).json({
                message: 'ID d\'animal invalide',
                receivedId: animal
            });
        }

        // Vérification basique des champs
        if (!date || !diagnostique || !animal || !veterinaire) {
            return res.status(400).json({
                message: 'Données manquantes',
                received: {
                    date: !!date,
                    diagnostique: !!diagnostique,
                    animal: !!animal,
                    veterinaire: !!veterinaire
                }
            });
        }

        // Vérification de l'animal
        console.log("Recherche de l'animal avec l'ID:", animal);
        const foundAnimal = await Animal.findById(animal);
        if (!foundAnimal) {
            console.log("Animal non trouvé avec l'ID:", animal);
            return res.status(404).json({ message: 'Animal non trouvé' });
        }
        console.log("Animal trouvé:", foundAnimal);

        // Vérification du vétérinaire
        console.log("Recherche du vétérinaire avec l'ID:", veterinaire);
        const foundVet = veterinarians.find(v => v._id === veterinaire);
        if (!foundVet) {
            console.log("Vétérinaire non trouvé avec l'ID:", veterinaire);
            return res.status(404).json({ message: 'Vétérinaire non trouvé' });
        }
        console.log("Vétérinaire trouvé:", foundVet);

        // Création de la visite
        const visitData = {
            date: date,
            diagnostique,
            animal: new mongoose.Types.ObjectId(animal),
            veterinaire: veterinaire
        };

        console.log("Données de la visite à créer:", visitData);

        const newVisit = new Visit(visitData);
        const savedVisit = await newVisit.save();

        console.log("Visite créée avec succès:", savedVisit);

        return res.status(201).json(savedVisit);
    } catch (error) {
        console.error("Erreur lors de la création de la visite:", error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Erreur de validation',
                errors: errors
            });
        }
        return res.status(500).json({
            message: 'Erreur serveur',
            error: error.message
        });
    }
};

const getVisitsByAnimal = async (req, res) => {
    try {
        const { animalId } = req.params;
        
        // Vérification que l'ID de l'animal est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(animalId)) {
            return res.status(400).json({
                message: 'ID d\'animal invalide',
                receivedId: animalId
            });
        }

        // Vérification de l'existence de l'animal
        const animal = await Animal.findById(animalId);
        if (!animal) {
            return res.status(404).json({ message: 'Animal non trouvé' });
        }

        // Récupération des visites de l'animal
        const visits = await Visit.find({ animal: animalId })
            .sort({ date: -1 }); // Tri par date décroissante

        res.status(200).json(visits);
    } catch (error) {
        console.error('Erreur lors de la récupération des visites :', error);
        res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
};

const updateVisit = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, diagnostique, veterinaire } = req.body;

        // Vérification que l'ID de la visite est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'ID de visite invalide',
                receivedId: id
            });
        }

        // Vérification que tous les champs sont fournis
        if (!date || !diagnostique || !veterinaire) {
            return res.status(400).json({
                message: 'Données manquantes',
                received: {
                    date: !!date,
                    diagnostique: !!diagnostique,
                    veterinaire: !!veterinaire
                }
            });
        }

        // Vérification que le vétérinaire existe dans notre liste statique
        const foundVet = veterinarians.find(v => v._id === veterinaire);
        if (!foundVet) {
            return res.status(404).json({ message: 'Vétérinaire non trouvé' });
        }

        // Mise à jour de la visite
        const updatedVisit = await Visit.findByIdAndUpdate(
            id,
            { 
                date: date,
                diagnostique,
                veterinaire
            },
            { new: true, runValidators: true }
        );

        if (!updatedVisit) {
            return res.status(404).json({ message: 'Visite non trouvée' });
        }

        res.status(200).json(updatedVisit);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la visite :', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Erreur de validation',
                errors: errors
            });
        }
        res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
};

export { addVisit, getVisitsByAnimal, updateVisit };