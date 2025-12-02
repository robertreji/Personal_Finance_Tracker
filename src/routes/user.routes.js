import {Router} from "express"
import { signUp } from "../controllers/user.Controllers/signUp.js"
import { isUniqueUsername } from "../controllers/user.Controllers/isUserNameUnique.js"

const router = Router()

router.route("/signUp").post(isUniqueUsername,signUp)

export default router