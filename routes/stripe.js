const { Route } = require("express");
const router = require("express").Router();
const res = require("express/lib/response");
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req,res) =>
{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "GBP"
    }, 
    
    (stripeErr, stripeRes) =>
    {
        if(stripeErr)
        {
            res.status(500).json(stripeErr);
        }
        else
        {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;