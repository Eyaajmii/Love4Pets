const Adoptant = require("../models/adoptant");
const { generateAccessToken } = require("../Middlewares/Auth");
const admins = [{ id: 1, username: "admineya", password: "eyaeya123" }];

class AuthService {
  // Authentification pour admin et adoptants
  static async authenticate(username, password) {
    const admin = admins.find(
      (a) => a.username === username && a.password === password
    );

    if (admin) {
      const token = generateAccessToken(username, "admin");
      return { token, user: { id: admin.id, username, role: "admin" } };
    }

    const adoptant = await Adoptant.findOne({ username });
    if (!adoptant || adoptant.password !== password) {
      throw new Error("Identifiants incorrects");
    }

    const token = generateAccessToken(username, "adoptant");
    return { token, user: { id: adoptant._id, username, role: "adoptant" } };
  }

  // Inscription des adoptants
  static async signup(cin, nom, prenom, username, email, password) {
    const existingUser = await Adoptant.findOne({
      $or: [{ username }, { email }, { cin }],
    });
    if (existingUser) {
      throw new Error("Adoptant est déjà enregistré");
    }
    const adoptant = new Adoptant({
      cin,
      nom,
      prenom,
      username,
      email,
      password,
    });
    await adoptant.save();
    const token = generateAccessToken(username, "adoptant");
    return { token, user: { id: adoptant._id, role: "adoptant", username } };
  }
}

module.exports = AuthService;
