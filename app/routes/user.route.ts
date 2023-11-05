import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup";
import { body } from "express-validator"

const router = Router();

router.post(
  "/register",
  //TODO: come up with decent validation rules
  body("username").isLength({ min: 5 }).isAlphanumeric(),
  body("password").isLength({ min: 5 }).isAlphanumeric(),
  body("email").isLength({ min: 5 }).isAlphanumeric().isEmail(),
  checkDuplicateUsernameOrEmail,
  userController.register
);
router.post("/login", userController.login);
router.get("/verify-email/:username", userController.verifyEmail);

export default router;