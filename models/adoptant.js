const mongoose = require("mongoose");

const AdoptantSchema = new mongoose.Schema(
  {
    cin: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adresse: { type: String, required: false },
    telephone: { type: String, required: false },
    typeHabit: { type: String, required: false },
    experienceAnimaux: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adoptant", AdoptantSchema);
