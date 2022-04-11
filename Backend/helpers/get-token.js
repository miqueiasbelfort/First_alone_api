const getToken = (req) => {

    const authHeader = req.headers.authorization //Pegando o token que foi enviado pelo req na parte header
    //console.log(authHeader) -> Ver como foi enviado o token no header
    const token = authHeader.split(" ")[1] //Trasformando o authHeader em um array e pegando apenas a parte do token

    return token
}

module.exports = getToken