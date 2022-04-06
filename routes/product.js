const req = require("express/lib/request");
const res = require("express/lib/response");
const { verify } = require("jsonwebtoken");
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create Products Method

router.post("/", verifyTokenAndAdmin, async (req,res) => 
{
    const newProduct = new Product(req.body)

    try
    {
        const savedProduct = await new newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Update Products Method

router.put("/:id", verifyTokenAndAdmin, async (req,res) => 
{
    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Delete Product Method

router.delete("/:id", verifyTokenAndAdmin, async (req,res) => 
{
    try
    {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...")
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Get Products Method

router.get("/:id", async (req,res) => 
{
    try
    {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//Get All Products Method

router.get("/", async (req,res) => 
{
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try
    {
        let product;

        if(qNew)
        {
            product = await Product.find().sort({createdAt: -1}).limit(1);
        }
        else if(qCategory)
        {
            product = await Product.find({categories: {
                $in: [qCategory],
            },
        });
        
        }
        else
        {
            product = await Product.find();
        }
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();

        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});


router.get("/usertest", (req, res) => 
{
    res.send("user test is successfull");
});

router.post("/userposttest", (req,res) =>
{
    const username = req.body.username;
    res.send("Your username is - " + username);
});

router.put("/:id", verifyTokenAndAuthorization, async (req,res)=> 
{
    if(req.body.password)
    {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try
    {
        const updatedUser = await User.findByIdAndUpdate(req,this.params.id, 
        {
            $set: req.body
        },{new:true}
        );

    res.status(200).json(updatedUser);
    
    }
    catch(err) {res.status(500).json(err)}
    {

    }

});


module.exports = router