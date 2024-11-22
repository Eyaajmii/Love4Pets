const Adoption = require("../models/adoption");

class AdoptionService {
  static async getAllAdoptions() {
    try {
      return await Adoption.find()
        .populate("adoptant", "name")
        .populate("animal", "name");
    } catch (error) {
      throw new Error("Error fetching adoptions: " + error);
    }
  }

  static async getAdoptionById(id) {
    try {
      const adoption = await Adoption.findById(id)
        .populate("adoptant", "name email")
        .populate("animal", "name type race");
      if (!adoption) {
        throw new Error("Adoption request not found");
      }
      return adoption;
    } catch (error) {
      throw new Error("Error retrieving adoption: " + error);
    }
  }

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
  static async createAdoptionRequest(animalId, userId) {
    try {
      const animal = await Animal.findById(animalId);
      if (!animal) {
        throw new Error("Animal not found");
      }

      const adoptant = await User.findById(userId);
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
  //user get his requests
  static async getAdoptionsByUserId(userId) {
    try {
      const adoptions = await Adoption.find({ adoptant: userId })
        .populate("animal", "name type race")
        .populate("adoptant", "name email");

      return adoptions;
    } catch (error) {
      throw new Error("Error fetching user adoptions: " + error.message);
    }
  }

  // Annuler une demande d'adoption en cours
  static async cancelAdoptionRequest(adoptionId) {
    try {
      const adoption = await Adoption.findById(adoptionId);
      if (!adoption) {
        throw new Error("Adoption request not found");
      }

      if (adoption.statut !== "En cours") {
        throw new Error(
          "Adoption request cannot be canceled, it has already been processed"
        );
      }

      await Adoption.findByIdAndDelete(adoptionId);
      return { message: "Adoption request canceled successfully" };
    } catch (error) {
      throw new Error("Error canceling adoption request: " + error.message);
    }
  }
}

module.exports = AdoptionService;
