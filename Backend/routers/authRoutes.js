const router = require("express").Router()

//Controller
const AuthController = require("../controllers/AuthController")

//middlewares
const verifyToken = require("../helpers/verify-token")

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.get("/userRoom", AuthController.userRoom)
router.get("/allUsers", verifyToken, AuthController.allUsers)
router.patch("/updateUsers/:id", verifyToken, AuthController.updateUsers)

module.exports = router