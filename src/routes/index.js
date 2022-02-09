
const express = require("express");
const authRouter = require("./authenticationRouter")
const adminRouter = require("./adminRouter")
const router = express.Router();



router.use("/auth" , authRouter)
router.use("/admin" , adminRouter)



module.exports = router;
