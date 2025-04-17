import express from "express"
import colors from "colors"
import morgan from "morgan"
import { db } from "../db"
import budgetRouter from "../../routes/budgetRouter"

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión exitosa a la base de datos'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Fallo la conexión a la base de datos'))
    }
}

connectDB()
const app = express()

app.use(morgan('dev'))


//Get information at the forms
app.use(express.json())

app.use('/api/budgets', budgetRouter)

export default app