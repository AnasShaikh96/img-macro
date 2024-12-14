import { Router } from "express"
import { registerCompany } from "../controllers/company.controllers.js";

const router = Router();

router.route('/register').post(registerCompany)

export default router

