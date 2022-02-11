
const express = require("express");
const authRouter = require("./authenticationRouter")
const adminRouter = require("./adminRouter")
const upadtepasswordRouter = require("./upadtepasswordRouter")

const router = express.Router();



router.use("/auth" , authRouter)
router.use("/admin" , adminRouter)
router.use("/passwordUpdate" , upadtepasswordRouter)




module.exports = router;
