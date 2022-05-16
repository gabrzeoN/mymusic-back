import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import db from "./../config/db.js";
import dayjs from "dayjs";

export async function signUp(req, res){
    const {name, image, email, password} = res.locals.user;
    const senhaHash = bcrypt.hashSync(password, 10);
    try {
        await db.collection("users").insertOne({
            name,
            image,
            email,
            password: senhaHash,
            registrationTime: dayjs().format('HH:mm:ss'),
            registrationDate: dayjs().format('DD/MM/YY'),
            cart: []
        });
        return res.sendStatus(201);
    } catch (e) {
        return res.status(500).send("Error to add client to the database!", e);
    }
}

export async function signIn(req, res){
    const {email, name, image} = res.locals.user;
    const token = v4();
    try{
        await db.collection("sessions").insertOne({
            token,
            email,
            time: dayjs().format('HH:mm:ss'),
            date: dayjs().format('DD/MM/YY'),
            status: true
        })
        return res.status(201).send({token, name, image});
    }catch(e){
        return res.sendStatus(500);
    }
}

export async function signOut(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    try{
        await db.collection("sessions").updateOne(
            {token},
            {$set: {status: false}}
        );
        res.sendStatus(200);
    }catch(e){
        console.log("Error on PUT /sign-out", e);
        res.sendStatus(500);
    }
}