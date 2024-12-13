import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email ID already Exists"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Minimum 6 characters required"]
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  }
}, { timestamps: true })


companySchema.pre("save", function () {
  if (!isModified(this.password)) {
    this.password = bcrypt.hash(this.password, 10)
  }
})

companySchema.method.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

companySchema.method.generateAccessToken = function () {

  return jwt.sign(
    {
      _id: this._id,
      companyName: this.companyName,
      email: this.email
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

companySchema.method.generateRefreshToken = function () {

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


export const Company = mongoose.model('Company', companySchema)