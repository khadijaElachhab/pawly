import mongoose from 'mongoose';

// Owner.js

const ownerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animal" }],
}, { timestamps: true });

export default mongoose.model('Owner', ownerSchema);

