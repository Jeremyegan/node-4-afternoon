const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const { user } = req.session;
        const { id } = req.params;
        
        const index = user.cart.findIndex(swag => swag.id == id);
        if(index === -1){
            const theeSwag = swag.find(swag => swag.id == id);

            user.cart.push(theeSwag)
            user.total += theeSwag.price;
        } 
            res.status(200).send(user)
    },

    delete: (req, res) => {
        const { id } = req.body;
        const { user } = req.session;

        const index = user.cart.findIndex(swag => swag.id == id);
        const selectedSwag = swag.find(swag => swag.id == id);

        if (index !== -1) {
            user.cart.splice(index, 1);
            user.total -= selectedSwag.price;
        }
    res.status(200).send(user);
    },

    checkout: (req, res) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send(user);
    }

}