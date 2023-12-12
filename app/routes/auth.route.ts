import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signin", authController.signin);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

export default authRouter;