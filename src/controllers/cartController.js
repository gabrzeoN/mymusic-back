import db from "../config/db.js";

export async function loadCart(req, res){
    const {cart} = res.locals.user;
    res.status(200).send(cart);
}

export async function addToCart(req, res){
    const {user} = res.locals;
    const instrument = req.body;
    try{
        // const instruments = await db.collection("intruments").findOne({ $or: [ { from: user }, { to: user }, { to: "Todos" }, { type: "message" } ] }).toArray();
        await db.collection("users").updateOne(
            {email: user.email},
            {$set: {cart: [...user.cart, instrument]}}
        );
        res.status(200).send(instrument);
    }catch(e){
        return res.status(500).send("Error to add an item to the cart!", e);
    }
}