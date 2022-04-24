const mongoose = require("mongoose")

let tokenSchema = new mongoose.Schema({
    username: {type: String},
    token: {type: String},
})

module.exports = mongoose.model("token", tokenSchema)