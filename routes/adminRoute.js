const express = require("express");
const router = express.Router();
const AnimalService = require("../Services/animalService");
const AdoptionService = require("../Services/adoptionService");
const AdoptantService = require("../Services/adoptantService");
const AuthService = require("../Services/authService");
const jwt = require("jsonwebtoken");

// Middleware pour vérifier l'authentification admin
const adminAuth = (req, res, next) => {
  console.log("Cookies received:", req.cookies);

  const token = req.cookies.adminToken;
  if (!token) {
    console.log("No adminToken found in cookies.");
    return res.status(401).redirect("/admin/login");
  }

  console.log("Token to verify:", token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return res.status(401).redirect("/admin/login");
    }

    console.log("Decoded JWT payload:", decoded);

    if (decoded.role !== "admin") {
      console.log("Invalid role in token:", decoded.role);
      return res.status(403).redirect("/admin/login");
    }

    req.user = decoded;
    next();
  });
};


// Routes Admin
router.get("/",adminAuth,(req, res) => {
  res.render("pages/dashboard", { body: "" });
});

router.get("/login", (req, res) => {
  res.render("pages/loginAdmin", { body: "" });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AuthService.authenticate(username, password);

    console.log("Admin authenticated:", admin);

    res
      .cookie("adminToken", admin.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .redirect("/admin/");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).render("pages/loginAdmin", { error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/login");
});


// Gestion des animaux
router.get("/animals", adminAuth, async (req, res) => {
  try {
    const animals = await AnimalService.getAllAnimals();
    res.render("pages/animal", { animals, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/animal/add", adminAuth, (req, res) => {
  res.render("pages/addAnimal", { body: "" });
});

router.post("/animal/add", adminAuth, async (req, res) => {
  try {
    const animalData = {
      ...req.body,
      vaccination: req.body.vaccination === "on" , 
      statut: req.body.statut || "Not Adopted",
    };

    // Appel au service pour créer l'animal
    await AnimalService.createAnimal(animalData);
    res.status(200).redirect("/admin/animals");
  } catch (error) {
    console.error("Error adding animal:", error.message);
    res.status(400).send(`Error adding animal: ${error.message}`);
  }
});
router.get("/detail/:id", adminAuth, async (req, res) => {
  try {
    const animal = await AnimalService.getAnimalById(req.params.id);
    res.render("pages/detailanimal", { animal, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/edit/:id", adminAuth, async (req, res) => {
  try {
    const animal = await AnimalService.getAnimalById(req.params.id);
    res.render("pages/editAnimal", { animal, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/edit/:id", adminAuth, async (req, res) => {
   try {
     const animalData = {
       ...req.body,
       vaccination: req.body.vaccination === "on", 
       statut: req.body.statut || "Not Adopted", 
     };
     await AnimalService.updateAnimal(req.params.id, animalData);
     res.redirect("/admin/animals");
   } catch (error) {
     res.status(500).send(error.message);
   }
});

router.post("/delete/:id", adminAuth, async (req, res) => {
  try {
    await AnimalService.deleteAnimal(req.params.id);
    res.redirect("/admin/animals");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Gestion des adoptions
router.get("/listedemande", adminAuth, async (req, res) => {
  try {
    const adoptions = await AdoptionService.getAllAdoptions();
    res.render("pages/adoption", { demandes: adoptions, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/update-status/:id", adminAuth, async (req, res) => {
  try {
    const { action } = req.query;
    const status = action === "approve" ? "Approuvé" : "Rejeté";
    await AdoptionService.updateAdoptionStatus(req.params.id, status);
    res.redirect("/admin/listedemande");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/demande/detail/:id", adminAuth, async (req, res) => {
  try {
    const demande = await AdoptionService.getAdoptionById(req.params.id);
    res.render("pages/detailDemande", { demande, body: "" });
  } catch (error) {
    res.status(404).send("Erreur : " + error.message);
  }
});

// Gestion des adoptants
router.get("/adoptant", adminAuth, async (req, res) => {
  try {
    const adoptants = await AdoptantService.getAllAdoptants();
    res.render("pages/adoptant", { adoptants, body: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
