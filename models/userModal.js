const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({

  userName: { type: String, required: true },
  userPwd: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  insertedAt: { type: Date, required: true, default: Date.now },
  userRole: { type: String, enum: ['user', 'admin'], default: 'user' },
  profilePic: { type: String }
});

const StudentModel = mongoose.model('Student', studentSchema)

module.exports = { StudentModel }