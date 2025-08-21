const express = require('express')
const cors = require('cors')
const path = require('path')
const formidable = require('express-formidable')
const session = require('express-session')
// const { isAuthenticated, role, hasRole } = require('./middleware/auth')
const jwt = require("jsonwebtoken");
const { verifyToken, SECRET_KEY } = require('./middleware/auth')
const { StudentModel } = require('./models/userModal')

const db = require('./dbConn')
const app = express()
const HOST = 'localhost'
const PORT = '8000'

app.use(cors())
app.set('view engine', 'ejs')
// app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(formidable())

app.use((req, res, next) => {
  res.set('Cache-Control', "no-store")
  next()
})


const adminRoutes = require('./routes/routesAdmin')

//localhost:8000/admin
//  app.use('/admin', isAuthenticated, hasRole('admin'), adminRoutes)

app.use('/api/admin', verifyToken, adminRoutes)


const userRoutes = require('./routes/routesUser')
// localhost:8000/user
// app.use('/user', isAuthenticated, hasRole('user'), userRoutes)



app.post('/api/loginform', async (req, res) => {

  const { mailId, pwd } = req.fields;
  // console.log(req.fields);
  const user = await StudentModel.findOne({ userEmail: mailId })

  if (user && (user.userPwd === pwd)) {
    console.log(user);

    const token = jwt.sign({ id: user._id, email: user.userEmail },
      SECRET_KEY, { expiresIn: "1h" });

    console.log(token);


    res.json({ success: true, message: "", user, token })
  }
  else {
    res.json({ success: false, message: "Invalid User ID" })
  }

})

// logout
app.get('/logout', (req, res) => {

  req.session.destroy((err) => {

    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/login')
    }
  })
})
app.listen(PORT, HOST, (err) => {

  if (!err)
    console.log(`Server running at http://${HOST}:${PORT}`);
  else
    console.log(`Server Can't start with ${err}`);

})