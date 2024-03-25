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
router.post("/addmember", authMiddleware, async (req, res) => {
    const groupId = req.query.groupId; // Access groupId from query parameters
    const memberId = req.body.memberId;

    try {
        // Find the group by ID

            const group =await Group.findOne({
                _id:groupId
        })

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.members.includes(memberId)) {
            return res.status(400).json({ message: 'Member already exists in the group' });
        }
        group.members.push(memberId);
        await group.save();

        res.status(200).json({ message: 'Member added to group successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports=router;


