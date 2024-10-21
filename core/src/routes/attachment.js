import express from "express";

import AttachmentController from "../app/controllers/attachment.js"
const router = express.Router();
const parseRawReqBody = express.raw({ 
    limit: 10 * 1024 * 1024, 
    type: [ "image/jpeg", 
            "image/png", 
            "text/plain", 
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ] 
});

// CHECKED
router.post("/:id", parseRawReqBody, AttachmentController.create);
// CHECKED
router.get("/t/:idTask", AttachmentController.getAllByIdTask);
// CHECKED
router.get("/:id", AttachmentController.getById);

// CHECKED
router.delete("/delete/:id", AttachmentController.deleteById);

// CHECKED
router.get("/", AttachmentController.getAll);

export default router;