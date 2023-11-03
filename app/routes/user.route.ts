import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup";

const router = Router();

router.post("/register", checkDuplicateUsernameOrEmail ,userController.register);
router.post("/login", userController.login);
router.get("/register", );
router.get("/login", );

export default router;