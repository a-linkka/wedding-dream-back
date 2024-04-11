import { Router } from "express";
const router = new Router();
import authController from "../controllers/auth.controller.js";

router.post('/registration', authController.registration)
router.post('/login', authController.login);

export default router