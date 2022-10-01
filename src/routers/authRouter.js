import { Router } from "express";
import { signIn, signUp, signOut} from "./../controllers/authController.js"
import validateSignIn from "../middwares/signInValidationMiddware.js";
import validateSignUp from "../middwares/signUpValidationMiddware.js";
import { validateToken } from "../middwares/tokenValidationMiddwares.js";
const authRouter = Router();

authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.put("/sign-out", validateToken, signOut);

export default authRouter;