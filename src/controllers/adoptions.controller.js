import { UserServices } from "../services/user.services.js";
import { PetServices } from "../services/pet.services.js";

import { AdoptionServices } from "../services/adoption.services.js";

export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
    this.petsService = new PetServices();
  }

  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const adoptionId = req.params.aid;
      const adoption = await this.adoptionsService.getById(adoptionId);
      if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
      res.send({ status: "success", payload: adoption });
    } catch (error) {
      next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;
      const user = await this.usersService.getById(uid);
      if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
      const pet = await this.petsService.getById({ _id: pid });
      if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
      if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      user.pets.push(pet._id);
      await this.usersService.update(user._id, { pets: user.pets });
      await this.petsService.update(pet._id, { adopted: true, owner: user._id });
      await this.adoptionsService.create({ owner: user._id, pet: pet._id });
      res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
      next(error);
    }
  };

  removeAllAdoptions = async (req, res, next) => {
    try {
      await this.adoptionsService.removeAll();
      res.send({ status: "success", message: "All adoptions have been removed" });
    } catch (error) {
      next(error);
    }
  };
}
