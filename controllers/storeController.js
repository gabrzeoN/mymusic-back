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

/* -------------------- Database example ----------------------
types: eletric-guitar, accoustic-guitar, bass, guitar-amp, bass-amp
[
    {
        "name": "AMERICAN PROFESSIONAL II STRATOCASTER®",
        "image": "https://i0.wp.com/guitarload.com.br/wp-content/uploads/2018/04/fender-strat-tele-hybrid-nova-guitarra-1.png?fit=800%2C260&ssl=1",
        "description": "The American Professional II Stratocaster® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player. \nOur popular Deep “C” neck now sports smooth rolled fingerboard edges, a “Super-Natural” satin finish and a newly sculpted neck heel for a supremely comfortable feel and easy access to the upper register. New V-Mod II Stratocaster single-coil pickups are more articulate than ever while retaining bell-like chime and warmth. An upgraded 2-point tremolo with a cold-rolled steel block increases sustain, clarity and high-end sparkle. \nThe American Pro II Stratocaster delivers instant familiarity and sonic versatility you’ll feel and hear right away, with broad ranging improvements that add up to nothing less than a new standard for professional instruments.",
        "type": "eletric-guitar",
        "price": 1500
    },
    {
        "name": "AMERICAN PROFESSIONAL II STRATOCASTER®",
        "image": "https://i0.wp.com/guitarload.com.br/wp-content/uploads/2018/04/fender-strat-tele-hybrid-nova-guitarra-1.png?fit=800%2C260&ssl=1",
        "description": "The American Professional II Stratocaster® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today’s working player. \nOur popular Deep “C” neck now sports smooth rolled fingerboard edges, a “Super-Natural” satin finish and a newly sculpted neck heel for a supremely comfortable feel and easy access to the upper register. New V-Mod II Stratocaster single-coil pickups are more articulate than ever while retaining bell-like chime and warmth. An upgraded 2-point tremolo with a cold-rolled steel block increases sustain, clarity and high-end sparkle. \nThe American Pro II Stratocaster delivers instant familiarity and sonic versatility you’ll feel and hear right away, with broad ranging improvements that add up to nothing less than a new standard for professional instruments.",
        "type": "eletric-guitar",
        "price": 1500
    }
]
*/