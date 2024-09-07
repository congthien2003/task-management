import express from "express";

import ProjectController from "../app/controllers/project.js";
const router = express.Router();

router.get("/c/:idUser", ProjectController.getCoopProjectByIdUser);
router.get("/u/:idUser", ProjectController.getAllByIdUser);
router.get("/:id", ProjectController.getById);
router.post("/:id/add-members", ProjectController.addMembers);
router.post("/:id/remove-members", ProjectController.removeMembers);
router.put("/:id", ProjectController.updateById);
router.delete("/delete/:id", ProjectController.deleteById);
router.post("/", ProjectController.create);
router.get("/", ProjectController.getAll);

export default router;
