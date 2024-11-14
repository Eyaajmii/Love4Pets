const express = require("express");
const router = express.Router();
const demandes=[]
//affichage de formulaire de demande apres selectionner un annimal
router.get("/demander/:animalId", (req, res) => {
  res.status(200);
});
router.post("/demander/:animalId",(req, res) => {
  //exemple 
  const demande={ide,iduser,animalid,statut}
    res.status(200);
});
//consulter les demandes pour tous les users
router.get("/listedemande", (req, res) => {
  res.status(200).render("/pagesdemandes/demandes");
});

// Route pour approuver ou rejeter une demande d'adoption
router.get("/update-status/:id", (req, res) => {
  res.redirect("/adoption");
});

module.exports = router;
