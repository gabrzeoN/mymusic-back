import { Router } from "express";
import { loadCart } from "../controllers/cartController.js";
import { validateToken } from "../middwares/tokenValidationMiddwares.js";

const cartRouter = Router();
cartRouter.get("/cart", validateToken, loadCart);

export default cartRouter;