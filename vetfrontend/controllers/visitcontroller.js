// Création de la visite
const visitData = {
    date: new Date(date),
    diagnostique,
    animal: new mongoose.Types.ObjectId(animal), // Conversion explicite en ObjectId
    veterinaire: veterinaire // On garde la chaîne de caractères pour le vétérinaire
}; 