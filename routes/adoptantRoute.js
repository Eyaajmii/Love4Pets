const express = require("express");
const router = express.Router();
const authService=require("../Services/authService");
const AdoptantService=require("../Services/adoptantService");

/** Auth*/
router.get("/signup", (req, res) => {
  res.status(200);
});
router.post("/signup", async (req, res) => {
  const { cin,nom, prenom, username, email, password } = req.body;
  try{
    const creerAdopatnt=await authService.signup(cin,nom,prenom,username,email,password);
    res
      .status(200)
      .json({ message: "Inscription réussie", creerAdopatnt });
  }catch(err){
    res.status(400).send("Erreur lors de l'inscription");
  }
});

router.get("/login", (req, res) => {
  res.status(200);
});

router.post("/login",async (req, res) => {
  const{username,password}=req.body;
  try{
    const user=await authService.authenticate(username,password);
    res.status(200).json({message:"Welcome!",user});
  }catch(err){
     res.status(400);
  }
});

router.get("/logout", (req, res) => {
  res.status(200).redirect("/");
});
/**Gerer profil */
router.get("/adoptant/:id", async(req, res) => {
 const { id } = req.params;
 try {
   const adoptant = await AdoptantService.getAdoptantById(id);
   res.status(200).json({message:'profil',adoptant}); 
 } catch (err) {
   res.status(400);
 }
});

router.post("/edit/:id",async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, username, email, password } = req.body;

  const updatedData = { nom, prenom, username, email, password }; 
  try {
    const updatedAdoptant = await AdoptantService.UpdateAdoptant(id, updatedData);
    res.status(200).json({ message: "Profil mis à jour", adoptant: updatedAdoptant });
  } catch (err) {
    res.status(400);
  }
});

router.delete("/delete/:id", async(req, res) => {
  const{id}=req.params;
  try{
    const deletedAdoptant=await AdoptantService.deleteAdoptant(id);
    res.status(200).json({ message: "profil supprimé", deletedAdoptant});
    }catch(err){
      res.status(400);
    }
});

/**Gerrer animal */

//all animals
router.get("/", (req, res) => {
  res.status(200).send("La liste des animaux");
});
//detail aniaml
router.get("/details/:id", (req, res) => {
  res.status(200).send("animal ",id);
});

/**Gerer adoption */
router.get("/addDemande/:animalId", (req, res) => {
  res
    .status(200)
    .send(
      `Page de formulaire pour la demande d'adoption de l'animal ${animalId}`
    );
});
router.post("/addDemande/{animalId", (req, res) => {
  res.status(200).send("demande ajouté avec succès");
});
//affiche demande
router.get("/demandes/:userId", (req, res) => {
  res.status(200);
});

router.delete("/demandes/:userId/:adoptionId", (req, res) => {
  res.status(200).send("Demande d'adoption annulée avec succès.");
});


module.exports = router;