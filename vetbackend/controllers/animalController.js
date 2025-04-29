import Animal from '../models/animal.js';
import Owner from '../models/Owner.js';

// Ajouter un nouvel animal
export const addAnimal = async (req, res) => {
  try {
    console.log('Données reçues:', req.body);
    const { name, type, age, owner, medicalHistory } = req.body;
    
    // Validation des champs requis
    if (!name || !type || !age || !owner) {
      return res.status(400).json({ 
        message: "Les champs name, type, age et owner sont requis" 
      });
    }

    // Vérifier si le propriétaire existe
    const existingOwner = await Owner.findById(owner);
    if (!existingOwner) {
      return res.status(404).json({ 
        message: "Le propriétaire spécifié n'existe pas" 
      });
    }
    
    // Créer l'animal
    const animal = new Animal({ 
      name, 
      type, 
      age, 
      owner, 
      medicalHistory: medicalHistory || [] 
    });
    
    console.log('Animal à créer:', animal);
    await animal.save();
    console.log('Animal créé avec succès:', animal);

    // Mettre à jour la liste des animaux du propriétaire
    await Owner.findByIdAndUpdate(
      owner,
      { $push: { animals: animal._id } },
      { new: true }
    );
    console.log('Propriétaire mis à jour avec succès');

    res.status(201).json(animal);
  } catch (error) {
    console.error('Erreur lors de la création de l\'animal:', error);
    res.status(400).json({ 
      message: "Erreur lors de la création de l'animal",
      error: error.message 
    });
  }
};

// Obtenir la liste des animaux
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('owner');
    res.status(200).json(animals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

