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