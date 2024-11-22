const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    age: { type: Number, required: true },
    taille: { type: String, required: true },
    statut: { type: String, required: true },
    sexe: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    /*image: { type: String },*/
    description: { type: String },
    recherche: { type: String },
    incompatibilite: { type: String },
    vaccination: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("animal", AnimalSchema);
