import { paymentSchema } from "../schemas/paymentSchema.js";

export default async function validatePayment(req, res, next){
    const paymentInfo = req.body;
    const {cart} = res.locals.user;

    const { error } = paymentSchema.validate(paymentInfo);
    if (error) return res.status(406).send(error.details.map(detail => detail.message));
    if(cart.length < 1) return res.status(400).send("Your cart is empty!");
        
    next();
}