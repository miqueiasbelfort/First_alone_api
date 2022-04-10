const mongoose = require('mongoose')

async function main(){
    mongoose.connect("mongodb://localhost:27017/userSystem") //conectando ao banco de dados na colection "userSystem"
    console.log("dataBase Connected...")
}

main().catch(err => console.log(err))

module.exports = mongoose