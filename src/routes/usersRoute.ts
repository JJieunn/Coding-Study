import express from "express"
import userController from "../controllers/usersController"

const router = express.Router()

router.post('/signup', userController.createUser)

export default router