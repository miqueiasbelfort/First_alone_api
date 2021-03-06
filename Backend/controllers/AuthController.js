const User = require("../models/User")
const jwt = require("jsonwebtoken")

//helpers
const createUserToken =  require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")

module.exports = class AuthController {

    //Registrar usuário
    static async register(req, res){

        const {name, email, age, city, state, password, confirpassword} = req.body

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
            password
        })

        try {

            const newUser = await user.save() //criando o usuário no banco de dados
            await createUserToken(newUser, req, res)

        } catch(err) {

            res.status(500).json({message: err})
        
        }
    }

    //Login
    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: "O email é obrigatorio!"})
            return
        }
        if(!password){
            res.status(422).json({message: "A senha é obrigatorio!"})
            return
        }

        //checando se o usuário existe
        const user = await User.findOne({email: email}) //Pegando usuário do banco de dados pelo email

        if(!user){
            res.status(422).json({message: "Esse usuário não existe!"})
            return
        }

        if(password != user.password){ //se a senha não for igual a senha do banco de dados
            res.status(422).json({message: "Senha incoreta!"})
            return
        }

        await createUserToken(user, req, res)

    }

    //Rota para checar o usuário e pegar todos os dados dele
    static async userRoom(req, res){

        let currentUser
        //console.log(req.headers.authorization)

        if(req.headers.authorization){

            const token = getToken(req) //Pegando o token
            const decoded = jwt.verify(token, "CriandoPelaPrimeiraVezUmaAPISozinho") //Pegando tudo relacionado ao token
            //console.log(decoded)

            //Pegando um usuário, pelo id que foi 
            //passado junto com o Token
            currentUser = await User.findById(decoded.id) 

            currentUser.password = undefined // Para que a senha não seja repasada também

        } else {
            currentUser = null
        }

        res.status(200).json(currentUser)
    }

    //Rota para peagr todos os usuários
    static async allUsers(req, res){
        
        const users = await User.find().select("-password")
        res.status(200).json({users})

    }

    //Rota apara edittar usuários
    static async updateUsers(req, res){

        const id = req.params.id

        const { name, email, age, city, state, password, confirpassword } = req.body

        if(!name || !email || !age || !city || !state || !password || !confirpassword){
            res.status(422).json({message: "Algum campo está faltando!"})
            return
        }
        if(password != confirpassword){
            res.status(422).json({message: "As senhas não são iguais!"})
            return
        }

        const user = {
            name,
            email,
            age,
            city,
            state,
            password
        }

        try {

            const updateUser = await User.findByIdAndUpdate(id, user)
            res.status(200).json({message: "Usuário Atualizado!"})

        } catch(err) {

            res.status(500).json({message: err})
            return

        }

    }
}