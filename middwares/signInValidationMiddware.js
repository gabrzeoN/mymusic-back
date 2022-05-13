import db from "../config/db.js";
import { signInSchema } from "../schemas/authSchemas.js";
import bcrypt from "bcrypt";

export default async function validateSignIn(req, res, next){
    const { email, password } = req.body;
    const user = req.body;
    const {error} = signInSchema.validate(user, {abortEarly: false});
    if(error) return res.status(406).send(error.details.map(detail => detail.message));
    try{
        const userExists = await db.collection('users').findOne({ email });
        if(!userExists || !bcrypt.compareSync(password, userExists.password)) return res.status(406).send("Invalid email or password!");
        res.locals.user = userExists;
        next();
    }catch(e){
        res.sendStatus(400)
    }
}