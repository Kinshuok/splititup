// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const {  Group} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

router.get("/mygroups",authMiddleware,async (req,res)=>{
    const userId=req.userId;
    try {
        // Find groups where the user is a member
        const groups = await Group.find({ members: userId });

         res.json(groups);
    } catch (error) {
        return res.status(500).json({ message: "group not found"});
    }
});
router.post("/creategroup",authMiddleware,async (req,res)=>{
    const { name } = req.body;
    const group = await Group.create({
        name,
        members:[req.userId],
    })
    res.json({
        group
    })

});



module.exports=router;


