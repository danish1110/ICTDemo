const express = require('express')
const router = express.Router()

const ctrlAdmin = require('../controllers/controllerAdmin')


//localhost:8000/admin/
// router.get('/', (req, res) => {
//   res.send("Admin Default Page")
// })

router.get('/', ctrlAdmin.ctrlDefault)

//localhost:8000/admin/home
// router.get("/home", (req, res) => {
//   res.send("Admin Home Page")
// })

router.get('/home', ctrlAdmin.ctrlHome)

//localhost:8000/admin/addUser

router.get('/addUser', ctrlAdmin.ctrlAddUser)


//localhost:8000/api/admin/addUser
router.post('/addUser', ctrlAdmin.ctrlAddUser)

//localhost:8000/api/admin/viewAll
router.get('/viewAll', ctrlAdmin.ctrlViewAll)

//localhost:8000/admin/editAll
router.get('/editAll/:uid', ctrlAdmin.ctrlEditUser)

// For update record based on ID
router.put('/editAll/:uid', ctrlAdmin.ctrlEditUser)

router.delete('/delete/:uid', ctrlAdmin.deleteUserByID)

module.exports = router
