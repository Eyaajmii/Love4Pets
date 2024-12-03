const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    espece: { type: String, required: true },
    age: { type: Number, required: true },
    taille: { type: String, required: true },
    statut: {
      type: String,
      required: true,
      enum: ["Adopted", "Not Adopted"],
      default: "Not Adopted",
    },
    sexe: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    /*image: { type: String },*/
    description: { type: String, required: true },
    recherche: { type: String, required: true },
    incompatibilite: { type: String, required: true },
    vaccination: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("animal", AnimalSchema);
