const req = require("express/lib/request");
const res = require("express/lib/response");
const { verify } = require("jsonwebtoken");
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create Orders Method

router.post("/", verifyToken, async (req,res) => 
{
    const newOrder = new Order(req.body)

    try
    {
        const savedOrder = await new newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Update Orders Method

router.put("/:id", verifyTokenAndAuthorization, async (req,res) => 
{
    try
    {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedOrder)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Delete Delete Orders Method

router.delete("/:id", verifyTokenAndAdmin, async (req,res) => 
{
    try
    {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...")
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Get USER orders Method

router.get("/find/:UserId", verifyTokenAndAuthorization, async (req,res) => 
{
    try
    {
        const orders = await Cart.find( { userId: req.params.userId});

        res.status(200).json(cart);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Get All Orders Method

router.get("/", verifyTokenAndAdmin, async (req,res) => 
{
    try
    {
        const orders = await Order.find();

        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
});

// Get Monthly Income Report

router.get("/income", verifyTokenAndAdmin, async (req,res) =>
{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try
    {
        const income = await Order.aggregate([
            { $match: { ceatedAt: { $gte: previousMonth } } },
        
            {
                $project: {
                month: { month: "$createdAt"},
                sales:"$amount",
            },
                $group: {
                    _id: "$month",
                    total:{$sum: "$sales"}
                }
            }
        
        ]);

        res.status(200).json.send(income);
        
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;