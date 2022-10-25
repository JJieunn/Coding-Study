import userDao from "../models/usersDao"
import { UserDTO } from "../dto/userDto";


const createUser = async (userData: UserDTO) => {
  return await userDao.createUser(userData)
}

export default { createUser }