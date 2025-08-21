const express = require('express')
const router = express.Router()

// Route Middleware
// localhost:8000/user
router.use((req, res, next) => {
  console.log("User Route Middleware");
  next()
})


router.get("/", (req, res) => {
  res.send("User Default Route Handler")
})

module.exports = router