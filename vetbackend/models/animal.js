import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  medicalHistory: [{ 
    date: { type: Date },
    description: { type: String },
  }],
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal; 