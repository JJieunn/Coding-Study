import express from "express"
import postRouter from "./postsRoute"

const router = express.Router()

router.use('/posts', postRouter)

export default router