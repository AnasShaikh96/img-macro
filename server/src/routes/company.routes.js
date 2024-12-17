import { Router } from "express"
import { loginCompany, registerCompany } from "../controllers/company.controllers.js";

const router = Router();

router.route('/register').post(registerCompany)
router.route('/login').post(loginCompany)

export default router

