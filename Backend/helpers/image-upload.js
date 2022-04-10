const multer = require("multer")
const path = require("path")

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){cb(null, "public/images")}, //Destinando a pasta das imagens
    // O nome do arquivo de acordo com a data atual e numeros aleatorios
    filename: function(req, file, cb){cb(null, Date.now() + String(Math.random() * 1000) + path.extname(file.originalname))}
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){ //Se a imagem não for png ou jpg
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }