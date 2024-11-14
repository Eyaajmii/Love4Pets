const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");

const admins = [{ id: 1, name: "admin1", password: "admin1" }];
const users = [];

router.get("/signup", (req, res) => {
  res.status(200);
});
router.post("/signup", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send("Nom et mot de passe requis.");
  }
  const userExists = users.find((user) => user.name === name);
  if (userExists) {
    return res.status(400).send("Nom d'utilisateur déjà utilisé.");
  }
  const newUser = { id: users.length + 1, name, password, profile: {} };
  users.push(newUser);
  res.status(201).send("Utilisateur inscrit avec succès.");
});



router.get("/login", (req, res) => {
  res.status(200);
});


router.post("/login", (req, res) => {
  const { name, password } = req.body;


  const admin = admins.find((a) => a.name === name && a.password === password);
  if (admin) {
    req.session.userId = admin.id;
    req.session.role = "admin"; 
    return res.status(200).send("Connexion réussie .");
  }

  const user = users.find((u) => u.name === name && u.password === password);
  if (user) {
    req.session.userId = user.id;
    req.session.role = "user"; 
    return res.status(200).send("Connexion réussie .");
  }
  res.status(401).send("Identifiants incorrects.");
});



router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect("/"); 
  });
});

router.get("pagesadmin/admin-dashboard", (req, res) => {
  if (req.session.userId && req.session.role === "admin") {
    res.render("admin-dashboard", { users });
  } else {
    res.redirect("/login");
  }
});


module.exports = router;
