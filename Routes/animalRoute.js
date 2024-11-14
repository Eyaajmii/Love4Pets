const express = require("express");
const router = express.Router();
const animals = [];

// Render the add-animal form
router.get("/add", (req, res) => {
  res
    .status(200)
    .render("pages/pagesanimal/add-animal", { title: "Ajouter un animal" });
});

// Add a new animal (POST)
router.post("/add", (req, res) => {
  const { nom, espece, age, taille, statut, image, sexe } = req.body;
  const newAnimal = {
    id: animals.length + 1,
    nom,
    espece,
    age,
    taille,
    statut,
    image,
    sexe,
  };
  animals.push(newAnimal);
  res.status(201).redirect("/animals"); // Redirect to the list of animals after adding
});

// Render the edit form for a specific animal (GET)
router.get("/edit/:id", (req, res) => {
  const animalId = parseInt(req.params.id);
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return res.status(404).send("Animal non trouvé");
  }
  res.status(200).render("pages/pagesanimal/edit-animal", { animal });
});

// Update an existing animal (PUT)
router.put("/edit/:id", (req, res) => {
  const animalId = parseInt(req.params.id);
  const { nom, espece, age, taille, statut, image, sexe } = req.body;
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return res.status(404).send("Animal non trouvé");
  }
  Object.assign(animal, { nom, espece, age, taille, statut, image, sexe });
  res.status(200).redirect(`/animals/details/${animalId}`); // Redirect to the animal details page
});

// Delete an animal
router.delete("/delete/:id", (req, res) => {
  const animalId = parseInt(req.params.id);
  const animalIndex = animals.findIndex((a) => a.id === animalId);

  if (animalIndex === -1) {
    return res.status(404).send("Animal non trouvé");
  }
  animals.splice(animalIndex, 1);
  res.status(200).redirect("/animals"); // Redirect to the list of animals after deletion
});

// View details of a specific animal
router.get("/details/:id", (req, res) => {
  const animalId = parseInt(req.params.id);
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return res.status(404).send("Animal non trouvé");
  }
  res.status(200).render("pages/pagesanimal/animalDetails", { animal });
});

// Display the list of all animals
router.get("/", (req, res) => {
  res.status(200).render("pages/pagesanimal/animalsList", { animals });
});

module.exports = router;
