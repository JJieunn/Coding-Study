import userService from "../services/usersService"
import { Request, Response } from "express";
import { UserDTO } from "../dto/userDto";
import { asyncWrap } from "../middlewares/errorHandler";

const createUser = asyncWrap (async (req: Request, res: Response) => {
    const userData: UserDTO = req.body;

    await userService.createUser(userData)
    res.status(201).json({ message: "USER_CREATED" })
});


export default { createUser }