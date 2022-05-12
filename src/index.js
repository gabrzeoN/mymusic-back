import express, {json} from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import {MongoClient} from "mongodb";
import cors from "cors";
import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());

let db = null;
const mongoClient = new MongoClient("mongodb+srv://teste:teste@clusterdoug.oqldb.mongodb.net/ClusterDoug?retryWrites=true&w=majority");
try{
    await mongoClient.connect()
    db = mongoClient.db(process.env.DATABASE);
    console.log(chalk.bold.green("Connected to database!"));
}catch(error){
    console.log(chalk.bold.red("Could't connet to database!"), error)
}


app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await db.collection('users').findOne({ email });
  if(user && bcrypt.compareSync(password, user.password)) {
      const token = v4();
      await db.collection("sessions").insertOne({
          email: user.email,
          status: user.status
      })
      res.send(token);
      console.log(chalk.redBright.bold("sucess, user founded!"));
  } else {
      console.log(chalk.red.bold("user not founded (email or password incorrect)"));
      res.sendStatus(400)
  }
});


app.post("/sign-up", async (req, res) => {
  const client = req.body; 
  const clientSchema = joi.object({ 
      name: joi.string().min(1).required(),
      image: joi.any().required(),
      email: joi.string().min(1).required(), 
      password: joi.string().min(8).required(),
      confirmPassword: joi.ref('password')
});
  const { error } = clientSchema.validate(client); // {value: info, [error]}
  if (error) {
    console.log(error, "Not working");
    return res.sendStatus(422);
  }
  const senhaHash = bcrypt.hashSync(client.password, 10);
  try {
    const clientExiste = await db.collection("users").findOne({ email: client.email  });
    if (clientExiste) {
      return res.sendStatus(409);
    }
    await db.collection("users").insertOne({name: client.name, email: client.email, password: senhaHash, image: client.image });
    console.log(chalk.green.bold("client add to the database"));
    res.sendStatus(200);

  } catch (e) {
    console.log(e);
    return res.status(500).send("Error to add client to the database!", e);
  }

});



















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