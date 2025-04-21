import { trasport } from "../config/nodemailer"
import { EmailType } from "../interfaces"


export class AuthEmail {
    static sendConfirmationEmail = async(user: EmailType) => {
        const email = await trasport.sendMail({
            from: "CashTracker <admin@cashtracker.com>",
            to: user.email,
            subject: "CashTracker email confirmation",
            html: `
                <p>Hola ${user.name}, you have created your account in CashTracker It's close to begin ready</p>
                <p>Go to: </p>
                <a href="#">Confirm your account</a>
                <p>and use the code: <b>${user.token}</b></p>
            `
        })
        console.log(`Sended message:${email.messageId}`)
    }
}