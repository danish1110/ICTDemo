
const express = require('express')
const userroutes = require('./routes/userroutes')
const app = express()
const PORT = 8000
const HOST = 'localhost'

// Application level Middleware
app.use((req, res, next) => {
  console.log("Middleware 1 Calling...");
  // res.send("Middleware ended the request response cycle...")
  next()
})

app.use((req, res, next) => {
  console.log("Middleware 2 Calling...");

  next()
})

app.use('/home', (req, res, next) => {
  console.log("Home Middleware Calling...");

  const error = new Error("Error Occured")
  next(error);
  // res.send('Home...')
  // next()
})

app.use('/user', userroutes)

app.get('/', (req, res) => {

  res.send("<h1 align='center'> Home Page </h1>")
})

// Error Handling Middleware
app.use((err, req, res, next) => {

  // console.log(err);
  // console.log(err.stack);
  res.send("Error Handling Middleware....")
})







app.listen(PORT, HOST, (err) => {
  if (!err)
    console.log(`Server running at http://${HOST}:${PORT}`);
  else
    console.log(`Server Can't start with ${err}`);
})