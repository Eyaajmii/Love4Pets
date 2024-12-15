const Animal = require("../models/animal");

class AnimalService {
  static async getAllAnimals() {
    try {
      return await Animal.find();
    } catch (error) {
      throw new Error("Error fetching animals: " + error);
    }
  }
  /** Static : Accès direct à la méthode sans instance*/
  static async getTotalAnimals() {
    try {
      const animals = await Animal.find();
      return animals.length;
    } catch (error) {
      throw new Error(`Error fetching total animals: ${error.message}`);
    }
  }
  static async getAnimalById(id) {
    try {
      const animal = await Animal.findById(id);
      if (!animal) {
        throw new Error("Animal not found");
      }
      return animal;
    } catch (error) {
      throw new Error("Error retrieving animal: " + error);
    }
  }

  static async createAnimal(data) {
    try {
      const newAnimal = new Animal(data);
      await newAnimal.save();
      return newAnimal;
    } catch (error) {
      throw new Error("Error adding animal: " + error);
    }
  }

  static async updateAnimal(id, data) {
    try {
      await Animal.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new Error("Error updating animal: " + error);
    }
  }

  static async deleteAnimal(id) {
    try {
      await Animal.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting animal: " + error);
    }
  }
}

module.exports = AnimalService;
