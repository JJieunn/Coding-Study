import postDao from "../models/postsDao"
import { CreatePostDTO } from "../dto/createPostDto"
import { UpdaatePostDTO } from "../dto/updatePostDto"

const createPost = async (userId: string | string[] | undefined, postData: CreatePostDTO) => {
  return await postDao.createPost(userId, postData)
}

const getPostList = async () => {
  return await postDao.getPostList()
}

const getPost = async (postId: string) => {
  await postDao.isPostExistedByPostId(postId)
  return await postDao.getPost(postId)
}

const updatePost = async (userId: string | string[] | undefined, postId: string, updateData: UpdaatePostDTO) => {
  await postDao.isPostExistedByPostId(postId)
  await postDao.isPostExistedByUserId(userId, postId)
  return await postDao.updatePost(postId, updateData)
}

const deletePost = async (userId: string | string[] | undefined, postId: string) => {
  await postDao.isPostExistedByPostId(postId)
  await postDao.isPostExistedByUserId(userId, postId)
  await postDao.deletePost(postId)
}

export default { 
  createPost,
  getPostList,
  getPost,
  updatePost,
  deletePost
}