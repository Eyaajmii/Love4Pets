const Adoption = require("../models/adoption");
const Animal = require("../models/animal");
const Adoptant = require("../models/adoptant");
class AdoptionService {
  static async getAllAdoptions() {
    try {
      return await Adoption.find()
        .populate("animal", "nom")
        .populate("adoptant", "prenom nom ");
    } catch (error) {
      throw new Error("Error fetching adoptions: " + error);
    }
  }

  static async getAdoptionById(id) {
    try {
      const adoption = await Adoption.findById(id)
        .populate("adoptant", "prenom nom")
        .populate("animal", "nom espece age");
      if (!adoption) {
        throw new Error("Adoption request not found");
      }
      return adoption;
    } catch (error) {
      throw new Error("Error retrieving adoption: " + error);
    }
  }

  //admin accepte ou reject
  static async updateAdoptionStatus(id, status) {
    try {
      const updatedAdoption = await Adoption.findByIdAndUpdate(
        id,
        { statut: status },
        { new: true }
      );
      if (!updatedAdoption) {
        throw new Error("Adoption request not found");
      }
      return updatedAdoption;
    } catch (error) {
      throw new Error("Error updating adoption status: " + error);
    }
  }
  //add demande
  static async createAdoptionRequest(animalId, userId) {
    try {
      const animal = await Animal.findById(animalId);
      if (!animal) {
        throw new Error("Animal not found");
      }

      const adoptant = await Adoptant.findById(userId);
      if (!adoptant) {
        throw new Error("User not found");
      }

      const newAdoption = new Adoption({
        animal: animalId,
        adoptant: userId,
        statut: "En cours",
      });

      await newAdoption.save();
      return newAdoption;
    } catch (error) {
      throw new Error("Error creating adoption request: " + error.message);
    }
  }
  //requests by adoptant
  static async getAdoptionsByUserId(id) {
    try {
      const adoptions = await Adoption.find({ adoptant: id })
        .populate("animal", "nom espece age")
        .populate("adoptant", "nom email");

      return adoptions;
    } catch (error) {
      throw new Error("Error fetching user adoptions: " + error.message);
    }
  }

  // Annuler une demande d'adoption en cours
  static async cancelAdoptionRequest(id) {
    try {
      const adoption = await Adoption.findById(id);
      if (!adoption) {
        throw new Error("Adoption request not found");
      }

      if (adoption.statut !== "En cours") {
        throw new Error(
          "Adoption request cannot be canceled, it has already been processed"
        );
      }
      await Adoption.findByIdAndDelete(id);
      return { message: "Adoption request canceled successfully" };
    } catch (error) {
      throw new Error("Error canceling adoption request: " + error.message);
    }
  }
}

module.exports = AdoptionService;
