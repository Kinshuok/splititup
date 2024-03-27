

const express = require('express');

const router = express.Router();
const zod = require("zod");
const {  Expenses, Group} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

router.post("/create-with-participants", authMiddleware, async (req, res) => {
    const body = req.body;
    const description = body.description;
    const amount = body.amount;
    const groupid = req.query.groupid;
    const participants = body.participants; // Array of participant user IDs
    const userId = req.userId; // Current user ID

    try {
        // Calculate the total number of participants including the current user
        const totalParticipants = participants.length + 1;

        // Calculate the amount owed per participant
        const amountOwedPerParticipant = amount / totalParticipants;

        // Create the expense with the provided data
        const expense = await Expenses.create({
            description: description,
            total_amount: amount,
            created_by: userId,
            participants: [
                // Include the current user as a participant with their owed amount
                { user: userId, amount_owed: amountOwedPerParticipant },
                // Include other participants with their owed amount (equal division)
                ...participants.map(participantId => ({ user: participantId, amount_owed: amountOwedPerParticipant }))
            ],
            group_id: groupid,
            settled_by: [userId],
            complete: false,
        });

        res.status(201).json({
            expense
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/groupexpenses",authMiddleware,async (req,res)=>{
    const groupid=req.query.groupid;
    if(!groupid){
        return res.status(404).json({message:"group not found"});
    }
    try{
        const expenses = await Expenses.find({
            group_id:groupid,
        })
        res.json({
            expenses,
        })
    } catch (e) {
        res.json(500).json({message: e.message });
    }
});

router.get("/calculate-total-money", authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        let totalMoneyLent = 0;
        let totalMoneyOwed = 0;

        // Find expenses where the user is either the payer or a participant
        const expenses = await Expenses.find({
            $or: [{ created_by: userId }, { 'participants.user': userId }]
        });

        // Iterate through each expense
        expenses.forEach(expense => {
            // If the user is the payer, calculate total money lent
            if (expense.created_by.toString() === userId) {
                // Find the user's contribution to the expense


                // Find participants who have settled their portion of the expense
                const settledParticipants = expense.participants.filter(participant => expense.settled_by.includes(participant.user.toString()));

                // Calculate the total amount settled by participants
                let settledAmount = 0;
                settledParticipants.forEach(participant => {
                    settledAmount += participant.amount_owed;
                });

                // Calculate total money lent by subtracting user's contribution and settled amount from total expense amount
                totalMoneyLent += expense.total_amount  - settledAmount;
            }

            // If the user is a participant and not the creator of the expense, calculate total money owed
            expense.participants.forEach(participant => {
                if (participant.user.toString() === userId && expense.created_by.toString() !== userId) {
                    totalMoneyOwed += participant.amount_owed;
                }
            });
        });

        // Calculate total money you get back by subtracting total money owed from total money lent
        const totalMoneyGetBack = totalMoneyLent - totalMoneyOwed;

        res.status(200).json({
           totalMoneyLent,
            totalMoneyOwed
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});
router.post("/add-settle", authMiddleware, async (req, res) => {
    const participantID = req.query.participantID;
    const expenseID = req.query.expenseID;

    if (!participantID || !expenseID) {
        return res.status(400).json({ message: "Participant or expense does not exist" });
    }

    try {
        const expense = await Expenses.findOne({ _id: expenseID });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        const completed = expense.complete;
        // Check if participantID already exists in settled_by array
        if (expense.settled_by.includes(participantID)) {
            return res.status(400).json({ message: "Expense already settled by this participant",completed });
        }

        // Add participantID to settled_by array
        expense.settled_by.push(participantID);
        if(expense.settled_by.length===expense.participants.length){
            expense.complete=true;
        }

        await expense.save();

        return res.status(200).json({
            message: "Expense settled from your side",
            completed

        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;

