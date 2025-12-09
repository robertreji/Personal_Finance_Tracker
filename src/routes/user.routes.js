import {Router} from "express"
import { signUp } from "../controllers/user.Controllers/signUp.js"
import { isUniqueUsername } from "../controllers/user.Controllers/isUserNameUnique.js"
import { signIn } from "../controllers/user.Controllers/userSignIn.js"
import { logout } from "../controllers/user.Controllers/logout.js"
import { refreshTokens } from "../controllers/user.Controllers/refreshToken.js"
import { verifyUser } from "../controllers/user.Controllers/verifyUser.js"
import { getUserDetails } from "../controllers/user.Controllers/getuseDetails.js"

const router = Router()

router.route("/signUp").post(signUp)
router.route("/signIn").post(signIn)
router.route("/logOut").get(verifyUser,logout)
router.route("/refreshTokens").get(refreshTokens)
router.route("/getuserdetails").get(verifyUser,getUserDetails)
router.route("/isUniqueUsername").post(isUniqueUsername)



export default router