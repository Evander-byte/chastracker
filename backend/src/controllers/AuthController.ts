import { Request, Response} from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/hash"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const {password, email} = req.body
            const userExist = await User.findOne({where: {email}})
            if(userExist){
                const error = new Error("Email already registered")
                res.status(409).json(error.message)
                return
            }
            const userPassword = await hashPassword(password)
            const user = new User(req.body)
            user.password = userPassword
            user.token = generateToken()
            await user.save()
            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })
            res.status(201).json("Account created successfully")
            
        } catch (error) {
            res.status(500).json("Server Error")
        }
    }

    static confirmAccount = async(req: Request, res: Response) => {
        const {token} = req.body
        const user = await User.findOne({where: {token}})
        if(!user) {
            const error = new Error("Invalid token")
            res.status(401).json({error: error.message})
            return
        }
        user.confirmed = true
        user.token= null
        await user.save()
        res.status(200).json("You confirmed your account. Thank you!")
    }

    static login = async(req: Request, res: Response) => {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            const error = new Error("Email not found")
            res.status(404).json({error: error.message})
        }
        if(!user.confirmed) {
            const error = new Error("Unconfirmed account")
            res.status(403).json({error: error.message})
        }
        const validatePassword = checkPassword(password, user.password)
        if(!validatePassword){
            const error = new Error("Invalid password")
            res.status(401).json({error: error.message})
        }

        const jwtoken = generateJWT(user.id)

        res.status(200).json(jwtoken)
    }
}