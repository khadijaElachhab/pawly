import Owner from "../models/Owner.js";

// Ajouter un propriétaire
export const addOwner = async (req, res) => {
    const { nom, email, telephone } = req.body;
    try {
        const newOwner = new Owner({ nom, email, telephone });
        await newOwner.save();
        res.status(201).json(newOwner);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du propriétaire" });
    }
};

// Obtenir tous les propriétaires
export const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des propriétaires" });
    }
};
