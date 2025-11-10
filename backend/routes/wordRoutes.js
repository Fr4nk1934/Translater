import express from "express";
import {
  getWords,
  createWord,
  editWord,
  removeWord,
} from "../controllers/wordController.js";

const router = express.Router();

router.get("/", getWords);
router.post("/", createWord);
router.put("/:id", editWord);
router.delete("/:id", removeWord);

export default router;
