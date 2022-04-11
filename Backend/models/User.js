const mongoose = require("../db/conn")
const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
    )
)

module.exports = User