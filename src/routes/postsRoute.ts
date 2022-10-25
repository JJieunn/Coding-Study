import express from "express"
import postController from "../controllers/postsController"

const router = express.Router()

router.post('', postController.createPost)
router.get('', postController.getPostList)
router.get('/:postId', postController.getPost)
router.patch('/:postId', postController.updatePost)
router.delete('/:postId', postController.deletePost)

export default router