const mongoose = require('mongoose')
const Exercise = require('./exercise')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    exercise: [Exercise.schema]

})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout