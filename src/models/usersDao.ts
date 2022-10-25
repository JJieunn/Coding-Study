import myDataSource from "../configs/db.connection";
import { UserDTO } from "../dto/userDto";
import { Users } from "../entities/user.entity"


const createUser = async (userData: UserDTO): Promise<object> => {
  return await myDataSource
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      nickname: userData.nickname,
      email: userData.email,
      password: userData.password
    })
    .execute()
}

export default { createUser }