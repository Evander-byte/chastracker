import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Budget from "../models/Budget"
import Expense from "../models/Expense"

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}


export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name')
        .notEmpty().withMessage("Expense's name cannot be empty").run(req)
    await body('amount')
        .notEmpty().withMessage("Expense's amount cannot be empty")
        .isNumeric().withMessage("Invalid amount")
        //Condicion must return false to trigger the check
        .custom(value => value > 0).withMessage("Expense's amount must be greater than 0").run(req)
    next()
}

export const validateExpenseId = async(req: Request, res: Response, next: NextFunction) => {
    await param('expenseId')
        .isInt().withMessage("Invalid ID")
        //Condition must return false to trigger the check
        .custom(value => value > 0)
        .run(req)
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(409).json({errors: errors.array()})
    }
    next()
}

export const validateExpenseExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {expenseId} = req.params
        const expense = await Expense.findByPk(expenseId)
        if(!expense){
            const error = new Error("Expense not found")
            res.status(404).json(error)
            return
        }
        req.expense = expense
        next()

    } catch (error) {
        res.status(500).json({error: "Server Error"})
    }
}