import express, {json} from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.listen(process.env.PORT, () => 
    console.log(chalk.bold.green(`Server online on port ${process.env.PORT}!`))
);