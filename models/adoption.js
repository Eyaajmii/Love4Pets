const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema(
  {
    DateAdoption: { type: Date },
    statut: {
      type: String,
      enum: ["En cours", "Approuvé", "Rejeté"],
      default: "En cours",
    },
    DateDemande: { type: Date, required: true, default: Date.now },
    Commentaire: { type: String },
    adoptant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adoptant",
      required: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "animal",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adoption", AdoptionSchema);
