import { Router } from "express";
import { addPurchase } from "../controllers/paymentController.js";
import validatePayment from "../middwares/paymentValidationMiddware.js";
import { validateToken } from "../middwares/tokenValidationMiddwares.js";

const paymentRouter = Router();
paymentRouter.post("/payment", validateToken, validatePayment, addPurchase);

export default paymentRouter;