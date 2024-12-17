import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async function (companyId) {

  const company = await Company.findById(companyId);

  if (!company) {
    throw new ApiError(404, "Cannot find Compay with given ID")
  }

  const accessToken = company.generateAccessToken()
  const refreshToken = company.generateRefreshToken()

  return { accessToken, refreshToken }
}


const registerCompany = asyncHandler(async (req, res) => {

  const { companyName, email, password } = req.body;

  if ([companyName, email, password].some((field) => !field || field.length === 0)) {
    throw new ApiError(404, "Company, Email and Password fields are mandatory")
  }

  const existCompany = await Company.findOne({ email });

  if (existCompany) {
    throw new ApiError(500, "Company with given email already exists!")
  }

  const company = await Company.create({ companyName, email, password });

  return res.status(200).json(
    new ApiResponse(200, "Company registered successfully", company)
  )
})

const loginCompany = asyncHandler(async (req, res) => {
  // email and password required
  // check if company exist
  // generate access and refresh token
  // set cookies

  const { email, password } = req.body

  if ([email, password].some((field) => !field || field.length === 0)) {
    throw new ApiError(400, "Email or Password is missing")
  }

  const company = await Company.findOne({ email });

  if (!company) {
    throw new ApiError(404, "Company with given mail is not registered")
  }

  const checkPassword = await company.checkPassword(password);

  if (!checkPassword) {
    throw new ApiError(401, "Password is incorrect")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(company._id);

  const updatedCompany = await Company.findByIdAndUpdate(company._id, { $set: { accessToken: accessToken, refreshToken: refreshToken } }).select("-accessToken -refreshToken")

  return res.status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(200, updatedCompany, "Logged in Successfully")
    )
})


export {
  registerCompany,
  loginCompany
}