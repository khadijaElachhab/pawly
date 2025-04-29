// visitRoutes.js
import express from "express";
import { addVisit, getVisitsByAnimal, updateVisit } from "../controllers/visitcontroller.js";

const router = express.Router();

// Route pour mettre à jour une visite par son ID
router.put("/visits/:id", updateVisit);

// Route pour ajouter une nouvelle visite
router.post('/add', addVisit);

// Route pour obtenir toutes les visites d'un animal donné
router.get("/:animalId/visits", getVisitsByAnimal);

export default router;

