const express = require("express");
const router = express.Router();

// Afficher le profil d'un adoptant
router.get("/adoptant/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send("Profil affiché", id );
});

// Mettre à jour le profil d'un adoptant
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  // Vérifiez si l'utilisateur est autorisé à mettre à jour ce profil
  if (id !== req.user.id) {
    return res.status(403);
  }
  res.status(200).send("Profil mis à jour", id );
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id !== req.user.id) {
    return res.status(403);
  }
  res.status(200);
});

module.exports = router;
