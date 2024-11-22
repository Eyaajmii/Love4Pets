const Adoptant = require("../models/adoptant");

class AdoptantService {
  static async getAllAdoptants() {
    try {
      return await Adoptant.find();
    } catch (error) {
      throw new Error("error retrieving adoptants: " + error);
    }
  }

  static async getAdoptantById(id) {
    try {
      const adoptant = await Adoptant.findById(id);
      if (!adoptant) {
        throw new Error("Adoptant not found");
      }
      return adoptant;
    } catch (error) {
      throw new Error("Error retrieving adoptant: " + error);
    }
  }
  static async UpdateAdoptant(id,updatedata){
    try{
      const adoptant = await Adoptant.findByIdAndUpdate(id,updatedata,{new:true});
      if(!adoptant){
        throw new Error("Adoptant not found");
        }
        return adoptant;
        }catch(error){
          throw new Error("Error updating adoptant: "+error);
        }
  }
  static async deleteAdoptant(id){
    try{
      const adoptant = await Adoptant.findByIdAndDelete(id);
      if(!adoptant){
        throw new Error("Adoptant not found");
        }
        return adoptant;
        }catch(error){
          throw new Error("Error deleting adoptant: "+error);
          }
  }
}

module.exports = AdoptantService;
