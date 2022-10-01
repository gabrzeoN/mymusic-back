import joi from "joi";

export const paymentSchema = joi.object({
    address: joi.string().trim().required(),
    creditCard: joi.number().integer().required(),
});