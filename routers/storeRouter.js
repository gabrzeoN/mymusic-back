import Router from "express";
import { postStore, getStore } from "../controllers/storeController.js";
import { validateToken } from "../middwares/tokenValidationMiddwares.js";

const storeRouter = Router();

storeRouter.post("/store", postStore);
storeRouter.get("/store", validateToken, getStore);

export default storeRouter;