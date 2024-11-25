import express from "express";
import {
  logEvent,
  getEvents,
  validateChain,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", logEvent);
router.get("/", getEvents);
router.get("/validate", validateChain);

export default router;
