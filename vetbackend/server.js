import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import cors from "cors";  // Ajoute cette ligne

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Middleware pour analyser le corps de la requête
app.use(express.json());

// Routes
app.use("/api/owners", ownerRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/visits", visitRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

