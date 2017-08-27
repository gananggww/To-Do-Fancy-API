const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")


router.get("/", userController.getAll)
router.post("/", userController.insert)
router.put("/:id", userController.edit)
router.delete("/:id", userController.remove)
router.post("/login", userController.login)



module.exports = router
