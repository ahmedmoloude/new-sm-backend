const express = require("express");
const { checkAdmin } = require("../middlewares");
const router = express.Router();
const  adminController = require("../controllores/adminController")

router.post(
    '/createManager',
    [checkAdmin.checkAdmin],
    adminController.createManager
);


module.exports = router;
