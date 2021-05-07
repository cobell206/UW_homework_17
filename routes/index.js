const router = require('express').Router()
const db = require('../models')
var path = require('path')


// Post new workout to recent workout plan
router.put('/api/workouts/:id', async (req, res) => {
    try {
        const updatedWorkout = await db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true });
        console.log(req.body);
        console.log(req.params.id);
        res.status(200).json(updatedWorkout)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Add new excersise to new workout plan
router.post('/api/workouts', async (req, res) => {
    try {
        const new_workout = await db.Workout.create({})
        res.status(200).json(new_workout)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Return weight from last seven
router.get('/api/workouts', async (req, res) => {
    try {
        const previous_workouts = await db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }]);
        res.status(200).json(previous_workouts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workout_range = await db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }]).sort({ _id: -1 }).limit(7);
        res.status(200).json(workout_range)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Return total duration of each of past seven

// GET homepage
router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET excercise
router.get('/exercise', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET stats page
router.get('/stats', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'))
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router