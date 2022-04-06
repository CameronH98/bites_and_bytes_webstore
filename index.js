const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const cors = require("cors");
const stripeRoute = require("./routes/stripe")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database Connection Successfull"))
.catch((err)=> {
    console.log(err);

});

app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT || 000, () => {
    console.log("server backend is running successfully!");
});
