import express, {json} from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import db from "./../config/db.js";
import authRouter  from "./../routers/authRouter.js";
import { loadCart } from "./../controllers/cartController.js"

// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());


app.use(authRouter);
app.get("/cart", loadCart);

app.listen(process.env.PORT, () => 
    console.log(chalk.bold.green(`Server online on port ${process.env.PORT}!`))
);