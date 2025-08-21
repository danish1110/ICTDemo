const express = require('express')
const router = express.Router()


// http://localhost:8000/user/
router.get('/', (req, res) => {
  res.send("User Default Page...")
})

router.get('/home', (req, res) => {
  res.send('User Home Page')
})

// http://localhost:8000/user/Amit
router.get('/:unm', (req, res) => {
  res.send(`Welcome ${req.params.unm} `)
})

// http://localhost:8000/user/1001/CSE
router.get('/:id/:dept', (req, res) => {
  res.send(`User ID:${req.params.id} Department:${req.params.dept} `)
})




module.exports = router