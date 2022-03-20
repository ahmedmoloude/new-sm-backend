
const express = require("express");
const authRouter = require("./authenticationRouter")
const adminRouter = require("./adminRouter")
const upadtepasswordRouter = require("./upadtepasswordRouter")
const clientRouter = require("./clientRouter")
const deliveryBoyRouter = require("./deliveryBoy.router")


const path = require("path");
const router = express.Router();



router.use("/auth" , authRouter)
router.use("/bo" , adminRouter)
router.use("/passwordUpdate" , upadtepasswordRouter)
router.use("/client" , clientRouter)
router.use("/" , deliveryBoyRouter)




router.get('/product_img', async (req, res) => {
    let filepath = path.join(__dirname , `/../../uploads/2022-02-17T00:04:17.566ZScreenshot from 2022-01-31 19-16-16.png`);
    res.sendFile(filepath);
});

module.exports = router;
