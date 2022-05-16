import db from "../config/db.js";

export async function addPurchase(req, res){
    const {address, creditCard} = req.body;
    const {cart, email, name} = res.locals.user;
    try{
        await db.collection("purchases").insertOne({name, email, address, creditCard, cart});
        return res.status(201).send("OK");
    }catch(e){
        return res.status(500).send("Error on purchase!", e);
    }
}