const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {

    //criando o token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "CriandoPelaPrimeiraVezUmaAPISozinho")

    // retornando o token
    res.status(200).json({
        message: "Você está altenticado!",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken