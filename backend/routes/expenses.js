

const express = require('express');

const router = express.Router();
const zod = require("zod");
const {  Expenses} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

router.post("/create/:group_Id",authMiddleware,async (req,res)=>{
    const body= req.body;
    const description =body.description;
    const amount =body.amount;
    const groupid=req.params.group_Id;
    const expense =await Expenses.create({
        description:description,
        total_amount:amount,
        created_by:req.userId,
        group_id:groupid,
        settled_by:[],
        complete:false,
    })

})
module.exports=router;