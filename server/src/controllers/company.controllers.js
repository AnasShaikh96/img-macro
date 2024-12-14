import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerCompany = asyncHandler(async (req, res) => {

  const { companyName, email, password } = req.body


})

export {
  registerCompany
}