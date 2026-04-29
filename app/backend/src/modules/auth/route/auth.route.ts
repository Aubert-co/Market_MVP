import { Router,Request,Response,NextFunction } from "express"
import { ValidateCredentials } from "@/middleware/validateCredentials"
import { AuthUserController } from "../controller/auth.controller"
import { UserService } from "../service/auth.service"
import { UserRepository } from "../repository/auth.repository"
import { prisma } from "@/lib/prisma"
const validateCredentials = new ValidateCredentials()

const userRepository =  new UserRepository(prisma)
const userService = new UserService(userRepository)
const authUser = new AuthUserController(userService)

const route = Router()
route.post('/register',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>authUser.Register(req,res,next))

route.post('/login',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>authUser.Login(req,res,next))

export default route