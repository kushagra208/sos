import express from 'express'
import { getMe, login, register } from '../controller/AuthController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router()


router.get("/me", getMe, isAuth);
router.post("/login", login);
router.post("/register", register);
// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword", resetPassword);
// router.


export default router;