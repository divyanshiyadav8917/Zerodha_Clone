require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const cors = require("cors");

const { HoldingModel } = require("./model/HoldingModel");
const { PositionModel } = require("./model/PositionModel");
const { OrderModel } = require("./model/OrderModel");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/allHoldings', async(req,res) => {
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
});

app.get('/allPositions', async(req,res) => {
    let allPostions = await PositionModel.find({});
    res.json(allPostions);
});

app.post('/newOrder', async(req,res) => {
    let newOrder = new OrderModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,  
    });

    newOrder.save();

    res.send("Order Saved!");
});

app.listen(PORT, () => {
    console.log("App Started!");
    mongoose.connect(uri);
    console.log("DB Connected!");
});
