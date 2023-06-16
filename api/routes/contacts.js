import express from "express";
import { submitContactMessage } from "../controllers/contacts.js";

const router = express.Router();

router.post("/", submitContactMessage);

export default router;
