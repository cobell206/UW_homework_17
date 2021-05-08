const db = require("../models");
const router = require("express").Router();

// Post new workout to recent workout plan
router.put('/api/workouts/:id', async (req, res) => {
    try {

        // Update database
        filter = { _id: req.params.id }
        update = { $push: { exercises: req.body } }
        const updatedWorkout = await db.Workout.findOneAndUpdate(filter, update, { new: true });

        // Send response
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

        // get workouts
        filter = { totalDuration: { $sum: "$exercises.duration" } }
        const previous_workouts = await db.Workout.aggregate([{ $addFields: filter }]);
        res.status(200).json(previous_workouts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/api/workouts/range', async (req, res) => {
    try {
        filter = { totalDuration: { $sum: "$exercises.duration" } }
        const workout_range = await db.Workout.aggregate([{ $addFields: filter }]).sort({ _id: -1 }).limit(7);
        res.status(200).json(workout_range)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router