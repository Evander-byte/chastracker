import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { TrasnportConfig } from '../../interfaces/index';

dotenv.config()

const config = (): TrasnportConfig => {
    return {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    }
}

export const trasport = nodemailer.createTransport(config())