const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema(
  {
    DateAdoption: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.DateDemande;
        },
        message:
          "La date d'adoption doit être ultérieure à la date de demande.",
      },
    },
    statut: {
      type: String,
      enum: ["En cours", "Approuvé", "Rejeté"],
      default: "En cours",
    },
    DateDemande: {
      type: Date,
      required: [true, "La date de demande est obligatoire."],
      default: Date.now,
    },
    Commentaire: {
      type: String,
      maxlength: [500, "Le commentaire ne peut pas dépasser 500 caractères."],
    },
    adoptant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adoptant",
      required: [true, "Un adoptant est requis pour une adoption."],
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "animal",
      required: [true, "Un animal est requis pour une adoption."],
      validate: {
        validator: async function (id) {
          const Animal = mongoose.model("animal");
          const animal = await Animal.findById(id);
          return animal && animal.statut !== "Adopted";
        },
        message: "L'animal sélectionné est déjà adopté.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adoption", AdoptionSchema);
