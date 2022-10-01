import { Router } from "express";
import { loadCart, addToCart } from "../controllers/cartController.js";
import { validateToken } from "../middwares/tokenValidationMiddwares.js";

const cartRouter = Router();
cartRouter.get("/cart", validateToken, loadCart);
cartRouter.post("/cart", validateToken, addToCart);

export default cartRouter;