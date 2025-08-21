
const { StudentModel } = require('../models/userModal')
const path = require('path')
const fs = require("fs");

const ctrlDefault = function (req, res) {
  console.log(req.session.user);
  res.send("Admin Default Page - Controller")
}

const ctrlHome = function (req, res) {
  // res.send("Admin Home Page - Controller")
  res.render('viewsAdmin/Home')
}

const ctrlAddUser = async function (req, res) {

  if (req.method == 'POST') {
    console.log('Data received....');

    const { unm, pwd, mailId } = (req.fields);
    const file = req.files.profilePic;
    let filePath = "";

    if (file) {
      const uploadPath = path.join(__dirname, "../public", "uploads");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      const newFileName = Date.now() + "_" + file.name;
      const fullFilePath = path.join(uploadPath, newFileName);

      fs.renameSync(file.path, fullFilePath);
      filePath = "/uploads/" + newFileName;
    }

    const newStudent = new StudentModel({
      userName: unm,
      userPwd: pwd,
      userEmail: mailId,
      profilePic: filePath
    });

    await newStudent.save()
    console.log("Data Saved...", newStudent);
    res.status(201).json({ success: true, message: "Record Added Successfully..." })
  }
}


const ctrlViewAll = async function (req, res) {
  const allUsers = await StudentModel.find()

  res.status(200).json({ success: true, allUsers })
}

const ctrlEditUser = async function (req, res) {

  if (req.method === 'PUT') {

    console.log(req.fields);

    const updUser = await StudentModel.findByIdAndUpdate(req.params.uid, { userPwd: req.fields.pwd, userEmail: req.fields.mailId }, { new: true })

    if (updUser)
      res.status(200).json({ user: updUser, success: true, message: "Record Updated...." })
    else
      res.status(500).json({ success: true, message: "Error Occured during Updation..." })
  }
  else if (req.method === 'GET') {
    const user = await StudentModel.findById(req.params.uid);
    res.status(200).json({ user, success: true, message: null })
  }
}

const deleteUserByID = async function (req, res) {

  const user = await StudentModel.findByIdAndDelete(req.params.uid)
  console.log(user);
  if (user)
    res.status(200).json({ success: true, msg: 'Record Deleted Successfully...' })
  else
    res.status(500).json({ success: false, msg: 'Error Occured during Deletion..."' })

}




module.exports = { ctrlDefault, ctrlHome, ctrlAddUser, ctrlViewAll, ctrlEditUser, deleteUserByID }