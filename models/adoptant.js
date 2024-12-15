const mongoose = require("mongoose");

const AdoptantSchema = new mongoose.Schema(
  {
    cin: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 8,
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adresse: { type: String, required: false },
    telephone: {
      type: String,
      required: true,
      match: /^[0-9]{8}$/,
    },
    typeHabit: { type: String, required: false },
    experienceAnimaux: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adoptant", AdoptantSchema);
