import express from "express";

import StudentController from "../app/controllers/student.js";
const router = express.Router();

const parseRawReqBody = express.raw({ 
  limit: 2 * 1024 * 1024, 
  type: [ "image/jpeg", "image/png" ] 
});

router.get("/:id", StudentController.getById);


router.put("/:id", StudentController.updateById);
router.delete("/delete/:id", StudentController.deleteById);
router.post("/", parseRawReqBody, StudentController.create);
router.get("/", StudentController.getAll);

export default router;
