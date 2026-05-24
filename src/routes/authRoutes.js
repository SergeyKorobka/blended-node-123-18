import { Router } from "express";
import { loginValidation, registerValidation } from "../validations/authValidation.js";
import { loginUser, logoutUser, refreshUserSession, registerUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/register', registerValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

export default router;
