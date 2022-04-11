const router = require("express").Router()

//Controller
const AuthController = require("../controllers/AuthController")

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.get("/userRoom", AuthController.userRoom)

module.exports = router