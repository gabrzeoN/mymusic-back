import { signUpSchema } from "../schemas/authSchemas.js";
import db from "../config/db.js";

export default async function validateSignUp(req, res, next){
    const {name, image, email, password, confirmPassword} = req.body;
    const user = req.body; 

    const { error } = signUpSchema.validate(user);
    if (error) return res.status(406).send(error.details.map(detail => detail.message));
    try {
        const userExists = await db.collection("users").findOne({email});
        if (userExists) return res.status(409).send("User already exits!");
            
        res.locals.user = user;
        next();
    } catch (e) {
        return res.status(500).send("Error to add client to the database!", e);
    }
}