import express from 'express';
import Animal from '../models/Animal.js';
import mongoose from 'mongoose';

const router = express.Router();

// Route pour créer un nouvel animal
router.post('/', async (req, res) => {
    try {
        const { name, type, age, owner, breed } = req.body;
        
        // Vérifier que tous les champs requis sont présents
        if (!name || !type || !age || !owner) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Créer un nouvel animal
        const animal = new Animal({
            name,
            type,
            age,
            owner: new mongoose.Types.ObjectId(owner),
            medicalHistory: [] // Initialiser avec un tableau vide
        });

        // Sauvegarder l'animal
        const savedAnimal = await animal.save();

        // Mettre à jour le propriétaire pour ajouter l'animal
        await mongoose.model('Owner').findByIdAndUpdate(
            owner,
            { $push: { animals: savedAnimal._id } }
        );

        res.status(201).json(savedAnimal);
    } catch (error) {
        console.error('Erreur lors de la création de l\'animal:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'animal', error: error.message });
    }
});

// Route pour récupérer les détails d'un animal
router.get('/details/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal non trouvé' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'animal', error: error.message });
    }
});

// Route pour mettre à jour un animal
router.put('/:id', async (req, res) => {
    try {
        const { name, type, age } = req.body;
        
        const animal = await Animal.findByIdAndUpdate(
            req.params.id,
            { name, type, age },
            { new: true }
        );

        if (!animal) {
            return res.status(404).json({ message: 'Animal non trouvé' });
        }

        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'animal', error: error.message });
    }
});

export default router; 