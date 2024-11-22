const express = require("express");
const router = express.Router();
const AnimalService = require("../Services/animalService");
const AdoptionService = require("../Services/adoptionService");
const AdoptantService = require("../Services/adoptantService");
const AuthService = require("../Services/authService");
// Dashboard admin
router.get("/", AuthService.isAuthenticated, (req, res) => {
  res.render("pages/dashboard", { body: "" });
});

// Authentification
router.get("/login", (req, res) => {
  res.status(200).render("pages/loginAdmin", { body: "" });
});

router.post("/login", async(req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AuthService.authenticate(username, password);
     const token = admin.token;
     req.session.token = token;
    res.status(200).redirect("/admin/");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).redirect("/");
});

// Gestion des animaux
router.get("/animals", AuthService.isAuthenticated, async (req, res) => {
  try {
    const animals = await AnimalService.getAllAnimals();
    res.render("pages/animal", { animals, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/animal/add", AuthService.isAuthenticated, (req, res) => {
  res.render("pages/addAnimal", { body: "" });
});

router.post("/animal/add", AuthService.isAuthenticated, async (req, res) => {
  try {
    await AnimalService.createAnimal(req.body);
    res.status(200).redirect("/admin/animals");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/detail/:id", AuthService.isAuthenticated, async (req, res) => {
  try {
    const animal = await AnimalService.getAnimalById(req.params.id);
    res.render("pages/detailanimal", { animal, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/edit/:id", AuthService.isAuthenticated, async (req, res) => {
  try {
    const animal = await AnimalService.getAnimalById(req.params.id);
    res.render("pages/editAnimal", { animal, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/edit/:id", AuthService.isAuthenticated, async (req, res) => {
  try {
    await AnimalService.updateAnimal(req.params.id, req.body);
    res.redirect("/admin/animals");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/delete/:id", AuthService.isAuthenticated, async (req, res) => {
  try {
    await AnimalService.deleteAnimal(req.params.id);
    res.redirect("/admin/animals");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Gestion des adoptions
router.get("/listedemande", AuthService.isAuthenticated, async (req, res) => {
  try {
    const adoptions = await AdoptionService.getAllAdoptions();
    res.render("pages/adoption", { demandes: adoptions, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get(
  "/update-status/:id",
  AuthService.isAuthenticated,
  async (req, res) => {
    try {
      const { action } = req.query;
      const status = action === "approve" ? "Approuvé" : "Rejeté";
      await AdoptionService.updateAdoptionStatus(req.params.id, status);
      res.redirect("/admin/listedemande");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get("/detail/:id", AuthService.isAuthenticated, async (req, res) => {
  try {
    const demande = await AdoptionService.getAdoptionById(req.params.id);
    res.render("pages/detailDemande", { demande, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Gestion des adoptants
router.get("/adoptant", AuthService.isAuthenticated, async (req, res) => {
  try {
    const adoptants = await AdoptantService.getAllAdoptants();
    res.render("pages/adoptant", { adoptants, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
