import db from "./../config/db.js";

export async function loadCart(){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session || !session.status){
        return res.status(406).send("Please, sign-in first!");
        }
        const cart = await db.collection("carts").findOne({email: session.email});
        const {products} = cart;

        const instruments = db.collection("instruments").find().toArray();
        instruments.filter(instrument => {
        if(products.includes(instrument._id)) return true;
        else return false;
        })
        return res.status(200).send(instruments);
    }catch(e){
        return res.sendStatus(500)
    }
}