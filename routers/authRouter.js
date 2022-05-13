import { Router } from "express";
import { signIn, signUp} from "./../controllers/authController.js"
import validateSignIn from "../middwares/signInValidationMiddware.js";
import validateSignUp from "../middwares/signUpValidationMiddware.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.post("/sign-up", validateSignUp, signUp);

export default authRouter;