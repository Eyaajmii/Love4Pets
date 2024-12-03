const express = require("express");
const router = express.Router();
const authService=require("../Services/authService");
const AdoptantService=require("../Services/adoptantService");
const AnimalService = require("../Services/animalService");
const AdoptionService = require("../Services/adoptionService");
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

router.put("/editprofile/:id",async (req, res) => {
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

router.delete("/deleteprofile/:id", async(req, res) => {
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
router.get("/animals", async (req, res) => {
  try {
    const animals = await AnimalService.getAllAnimals();
      res.status(200).json(animals);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//detail aniaml
router.get("/animal/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const animal = await AnimalService.getAnimalById(id); 
    if (!animal) {
      return res.status(404).send("Animal not found");
    }
    res.status(200).json(animal); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**Gerer adoption */
router.get("/addDemande/:animalId", (req, res) => {
  res
    .status(200)
    .send(
      `Page de formulaire pour la demande d'adoption de l'animal `
    );
});
//new request
router.post("/addDemande/:animalId", async (req, res) => {
  const { userId } = req.body; 

  try {
    const newAdoption = await AdoptionService.createAdoptionRequest(
      req.params.animalId,
      userId
    );
    res.status(200).json(newAdoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//affiche demande les deatils de l'adoptant
router.get("/demandes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const adoptions = await AdoptionService.getAdoptionsByUserId(id);

    if (!adoptions || adoptions.length === 0) {
      return res.status(404).json({ message: "No adoptions found for this user." });
    }

    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error fetching user adoptions:", error.message);
    res.status(500).json({ message: "Error fetching user adoptions.", error: error.message });
  }
});

router.delete("/demandes/:userId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletReq = await AdoptionService.cancelAdoptionRequest(id);
    // Send a success response
    res.status(200).json({ message: deletReq.message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;