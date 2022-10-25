import postService from "../services/postsService"
import { Request, Response } from "express";
import { CreatePostDTO } from "../dto/createPostDto";
import { UpdaatePostDTO } from "../dto/updatePostDto";
import { asyncWrap } from "../middlewares/errorHandler";

const createPost =  asyncWrap (async (req: Request, res: Response) => {
  const userId = req.headers.id;
  const postData: CreatePostDTO = req.body;

  await postService.createPost(userId, postData);
  res.status(201).json({ message: "POST_CREATED" })
});

const getPostList = asyncWrap (async (req: Request, res: Response) => {
  const postList = await postService.getPostList(); 
  res.status(200).json(postList)
});

const getPost = asyncWrap (async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const post = await postService.getPost(postId);
  res.status(200).json(post)
});


const updatePost = asyncWrap (async (req: Request, res: Response) => {
  const userId = req.headers.id;
  const postId = req.params.postId;
  const updateData: UpdaatePostDTO = req.body;

  const updatePostRes = await postService.updatePost(userId, postId, updateData);
  res.status(200).json({ message: "UPDATE_SUCCESS", updatePostRes }) 
});

const deletePost = asyncWrap (async (req: Request, res: Response) => {
  const userId = req.headers.id;
  const postId = req.params.postId;

  await postService.deletePost(userId, postId);
  res.status(204).send({ message: "DELETE_SUCCESS" })
});

export default { 
  createPost,
  getPostList,
  getPost,
  updatePost,
  deletePost
}