const express = require('express')
const router = express.Router()
const todoController = require("../controller/todoController")


router.get("/", todoController.getAll)
router.post("/", todoController.insert)
router.put("/:id", todoController.edit)
router.delete("/:id", todoController.remove)


module.exports = router
