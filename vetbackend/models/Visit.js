import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    date: { 
        type: String, 
        required: true 
    },
    diagnostique: {
        type: String,
        required: true
    },
    animal: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Animal", 
        required: true 
    },
    veterinaire: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true
});

// Validation personnalisée pour vérifier que l'animal existe
visitSchema.path('animal').validate(async function(value) {
    try {
        const animal = await mongoose.model('Animal').findById(value);
        return animal !== null;
    } catch (error) {
        return false;
    }
}, 'L\'animal spécifié n\'existe pas');

export default mongoose.model('Visit', visitSchema);