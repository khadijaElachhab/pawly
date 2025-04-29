import express from 'express';
import Owner from '../models/Owner.js';

const router = express.Router();

// Ajouter un propriétaire
router.post("/", async (req, res) => {
    try {
        const newOwner = new Owner(req.body);
        await newOwner.save();
        res.status(201).json(newOwner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// **Nouvelle route pour récupérer un propriétaire par ID**
router.get("/:ownerId", async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.ownerId).populate("animals"); // Ajout de populate
        if (!owner) return res.status(404).json({ message: "Propriétaire non trouvé" });
        res.json(owner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// Chercher un propriétaire par prénom (optionnel)
router.get("/name/:name", async (req, res) => {
    try {
        const owner = await Owner.findOne({ firstName: req.params.name });
        if (!owner) return res.status(404).json({ message: "Propriétaire non trouvé" });
        res.json(owner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Chercher des propriétaires par lastName
router.get("/", async (req, res) => {
    try {
        const { lastname } = req.query;  // Utiliser "lastname" au lieu de "lastName"
        if (lastname) {
            const owners = await Owner.find({ lastName: lastname }).populate("animals");
            if (owners.length === 0) return res.status(404).json({ message: "Aucun propriétaire trouvé" });
            return res.json(owners);
        }
        res.status(400).json({ message: "lastname est requis" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **Nouvelle route pour récupérer un propriétaire par ID**
router.get("/:ownerId", async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.ownerId); // Utilise l'ID pour trouver le propriétaire
        if (!owner) return res.status(404).json({ message: "Propriétaire non trouvé" });
        res.json(owner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    console.log("Requête DELETE reçue pour l’ID :", req.params.id);
    try {
        const owner = await Owner.findByIdAndDelete(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Propriétaire non trouvé' });
        }
        res.status(200).json({ message: 'Propriétaire supprimé avec succès' });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
// Modifier un propriétaire
router.put("/:ownerId", async (req, res) => {
    try {
      console.log("Mise à jour propriétaire avec ID :", req.params.ownerId);
      console.log("Données reçues :", req.body);
  
      const updatedOwner = await Owner.findByIdAndUpdate(
        req.params.ownerId,
        req.body,
        { new: true, runValidators: true }
      );
  

      if (!updatedOwner) {
        console.log("❌ Propriétaire non trouvé");
        return res.status(404).json({ message: "Propriétaire non trouvé" });
      }
      console.log("✅ Propriétaire mis à jour :", updatedOwner);

      res.json({ message: "Propriétaire mis à jour avec succès", owner: updatedOwner });
    } catch (error) {
      console.error("Erreur dans PUT /owners/:id :", error);
      res.status(500).json({ error: error.message });
    }
  });
  


export default router;
