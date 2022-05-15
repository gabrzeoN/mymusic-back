import express, {json} from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import authRouter  from "./../routers/authRouter.js";
import cartRouter from "../routers/cartRouter.js";
import storeRouter from "../routers/storeRouter.js";

// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(cartRouter);
app.use(storeRouter)

app.listen(process.env.PORT, () => 
    console.log(chalk.bold.green(`Server online on port ${process.env.PORT}!`))
);