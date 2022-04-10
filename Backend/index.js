const express = require("express")
const cors = require("cors")

const app = express()

//midllewares
app.use(express.json())

//cors
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000" //Site que pode consumir nossa api
}))

app.use(express.static('public'))

//rotas
const authRoutes = require("./routers/authRoutes")

app.use("/", authRoutes)

app.listen(5000)