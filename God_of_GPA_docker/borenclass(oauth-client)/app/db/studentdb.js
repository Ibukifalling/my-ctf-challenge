const mongoose = require("mongoose")

let studentSchema = new mongoose.Schema({
    name: {type: String},
    score1: {
        type: Number,
        min: 0,
        max: 100
    },
    score2: {
        type: Number,
        min: 0,
        max: 100
    },
    score3: {
        type: Number,
        min: 0,
        max: 100
    },
    score4: {
        type: Number,
        min: 0,
        max: 100
    },
    comment: {type: String}
})

module.exports = mongoose.model("student", studentSchema)