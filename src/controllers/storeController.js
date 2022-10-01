import db from "../config/db.js";

export async function postStore(req, res){
    const instruments = req.body;
    try{
        await db.collection("instruments").insertMany(instruments);
        return res.status(201).send("Ok");
    }catch(e){
        return res.status(500).send("Error to add items to the store!");
    }
}

export async function getStore(req, res){
    try{
        const instruments = await db.collection("instruments").find({}).toArray();
        return res.status(200).send(instruments);
    }catch(e){
        return res.status(500).send("Error to get items from the store!");
    }
}