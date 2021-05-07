const mongoose = require('mongoose')
const Exercise = require('./exercise')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    exercises: [Exercise.schema]

},
{
    versionKey: false
}
)

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout