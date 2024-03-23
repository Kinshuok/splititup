// backend/user/index.js
const express = require('express');
const userRouter = require("./user");
const GroupRouter =require("./group")

const router = express.Router();

router.use("/user", userRouter);

router.use("/group",GroupRouter);
module.exports = router;



