import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { body } from "express-validator"
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.post(
  "/signup",
  //TODO: come up with decent validation rules
  body("username").isLength({ min: 5 }).isAlphanumeric(),
  body("password").isLength({ min: 5 }).isAlphanumeric(),
  body("email").isLength({ min: 5 }).isAlphanumeric().isEmail(),
  userController.signup
);

userRouter.get("/:username", verifyToken ,userController.getUser);
userRouter.patch("/:username", verifyToken, userController.updateUser);

userRouter.post("/verify-email/:userInfoEncoded", userController.verifyEmail);
userRouter.post("/reset-password/:userInfoEncoded", userController.resetPassword);

userRouter.post("/send-reset-password/", userController.sendResetPasswordEmail);
userRouter.post("/resend-verification/", userController.resendVerificationEmail);


export default userRouter;