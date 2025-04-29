import express from 'express';
import Animal from '../models/animal.js';
import { addAnimal, getAnimals } from '../controllers/animalController.js';

const router = express.Router();

// Ajouter un animal
router.post("/", addAnimal);

// Obtenir la liste des animaux
router.get("/", getAnimals);

// ✅ Obtenir un animal par son ID (pour la modification)
router.get("/details/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate("visits");
    if (!animal) return res.status(404).json({ message: "Animal non trouvé" });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Modifier un animal
router.put("/:id", async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnimal) return res.status(404).json({ message: "Animal non trouvé" });
    res.json({ message: "Animal modifié avec succès", updatedAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Liste des animaux d'un propriétaire
router.get("/:ownerId", async (req, res) => {
  try {
    const animals = await Animal.find({ owner: req.params.ownerId }).populate("visits");
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
