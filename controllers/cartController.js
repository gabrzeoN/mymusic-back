export async function loadCart(req, res){
    const {cart} = res.locals.user;
    res.status(200).send(cart);
}
