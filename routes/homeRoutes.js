var path = require('path');
const router = require('express').Router();

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