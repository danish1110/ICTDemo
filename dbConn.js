
let mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/ICT_Online'

mongoose.connect(mongoURI).then(() => {
  console.log("Mongo DB Connected...");
}).catch((err) => {
  console.log("MongoDB Connection Failed ", err);

})

module.exports = mongoose
