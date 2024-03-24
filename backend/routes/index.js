// backend/user/index.js
const express = require('express');
const userRouter = require("./user");
const GroupRouter =require("./group")
const ExpenseRouter=require("./expenses");
const router = express.Router();

router.use("/user", userRouter);

router.use("/group",GroupRouter);
router.use("/expenses",ExpenseRouter);
module.exports = router;



