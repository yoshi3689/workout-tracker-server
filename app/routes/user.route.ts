import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { body } from "express-validator"

const userRouter = Router();

userRouter.post(
  "/signup",
  //TODO: come up with decent validation rules
  body("username").isLength({ min: 5 }).isAlphanumeric(),
  body("password").isLength({ min: 5 }).isAlphanumeric(),
  body("email").isLength({ min: 5 }).isAlphanumeric().isEmail(),
  userController.signup
);

userRouter.get("/verify-email/:usernameEncoded", userController.verifyEmail);

export default userRouter;