import myDataSource from "../configs/db.connection"
import { CreatePostDTO } from "../dto/createPostDto";
import { UpdaatePostDTO } from "../dto/updatePostDto";
import { Posts } from "../entities/post.entity"
import { Users } from "../entities/user.entity";
import { NotFoundError, ForbiddenError } from "../middlewares/createError"


const isPostExistByPostId = async (postId: string): Promise<object | undefined> => {
  const postRes = await myDataSource
    .createQueryBuilder()
    .select("COUNT(id)", "count")
    .from(Posts, "p")
    .where("p.id = :postId", { postId })
    .getRawOne()
  
  if(postRes.count === '0') throw new NotFoundError("NotFound")
  return postRes;  
}


const isPostExistByUserId = async (userId: string | string[] | undefined, postId: string): Promise<object | undefined> => {
  const userPostRes = await myDataSource
    .createQueryBuilder()
    .select("COUNT(id)", "count")
    .from(Posts, "p")
    .where("p.id = :postId", { postId })
    .andWhere("p.user_id = :userId", { userId })
    .getRawOne()

  if(userPostRes.count === '0') throw new ForbiddenError("Forbidden")
  return userPostRes;
}


const createPost = async (userId: string | string[] | undefined, postData: CreatePostDTO): Promise<object> => {
  return await myDataSource
    .createQueryBuilder()
    .insert()
    .into(Posts)
    .values({
      user_id: userId,
      title: postData.title,
      content: postData.content
    })
    .execute()
}

// user.nickname... 어떻게 해야 나와..?
const getPostList = async (): Promise<Posts[]> => {
  return await myDataSource
    .createQueryBuilder()
    .select(["p.id", "p.title", "p.created_at", "p.user_id", "u.nickname"])
    .innerJoin(Users, "u", "p.user_id = u.id")
    .from(Posts, "p")
    .orderBy("p.created_at", "DESC")
    .getMany()
}


const getPost = async (postId: string): Promise<Posts | null> => {
  return await myDataSource
    .createQueryBuilder()
    .select(["p.id", "p.title", "p.content", "p.created_at", "p.user_id", "u.nickname"])
    .innerJoin(Users, "u", "p.user_id = u.id")
    .from(Posts, "p")
    .where("p.id = :postId", { postId })
    .getOne()
}


const updatePost = async (postId: string, updateData: UpdaatePostDTO): Promise<void> => {  
  await myDataSource
    .createQueryBuilder()
    .update(Posts)
    .set({ title: updateData.title, content: updateData.content })
    .where("id = :postId", { postId })
    .execute()
} 


const deletePost = async (postId: string): Promise<void> => {
  await myDataSource
    .createQueryBuilder()
    .delete()
    .from(Posts)
    .where( "id = :postId", { postId })
    .execute()
}



export default { 
  isPostExistByPostId,
  isPostExistByUserId,
  createPost,
  getPostList,
  getPost,
  updatePost,
  deletePost 
}