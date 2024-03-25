

const express = require('express');

const router = express.Router();
const zod = require("zod");
const {  Expenses, Group} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

router.post("/create",authMiddleware,async (req,res)=>{
    const body= req.body;
    const description =body.description;
    const amount =body.amount;
    const groupid=req.query.group_Id;
    const expense =await Expenses.create({
        description:description,
        total_amount:amount,
        created_by:req.userId,
        participants:[{
           user: req.userId,
           amount_owed: amount,
        }],
        group_id:groupid,
        settled_by:[req.userId],
        complete:false,
    })
    res.status(401).json({
        expense
    })

})

// Assuming your Expense model schema looks like this:


// Add a new participant to an expense and recalculate split amounts for all participants
router.post('/add-participant/', async (req, res) => {
    const expenseId = req.query.expenseId;
    const newParticipant = {
        user: req.body.userId,
        amount_owed: 0 // Initialize the amount owed for the new participant
    }; // Assuming the request body contains information about the new participant to be added

    try {
        // Find the expense associated with the provided ID
        const expense = await Expenses.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Add the new participant to the expense's participants array
        expense.participants.push(newParticipant);

        // Recalculate split amount for each participant
        const totalParticipants = expense.participants.length;
        const totalAmount = expense.total_amount;

        expense.participants.forEach(participant => {
            participant.amount_owed = totalAmount / totalParticipants;
        });

        // Save the updated expense document
        await expense.save();

        res.json({ message: 'New participant added successfully and split amounts recalculated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


module.exports=router;