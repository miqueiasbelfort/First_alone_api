const User = require("../models/User")
const jwt = require("jsonwebtoken")

//helpers
const createUserToken =  require("../helpers/create-user-token")

module.exports = class AuthController {

    //registrar usuário
    static async register(req, res){

        const {name, email, age, city, state, password, confirpassword} = req.body

        let photo = ""

        if(req.file){
            photo = req.file.filename
        }

        if(!name || !email || !age || !city || !state || !password || !confirpassword){
            res.status(422).json({message: "Algum campo está faltando!"})
            return
        }

        if(password != confirpassword){
            res.status(422).json({message: "As senhas não são iguais!"})
            return
        }

        //checando os usuários
        const userExiste = await User.findOne({email: email}) //pagando o usuário com email igual ao email do body

        if(userExiste){
            res.status(422).json({message: "Usuário já existe!"})
            return
        }

        const user = new User({
            name,
            email,
            age,
            city,
            state,
            photo,
            password
        })

        try {

            const newUser = await user.save() //criando o usuário no banco de dados
            await createUserToken(newUser, req, res)

        } catch(err) {

            res.status(500).json({message: err})
        
        }
    }

}