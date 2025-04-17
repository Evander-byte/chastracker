import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Budget from "../models/Budget"
import { handleInputError } from "./validation"

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetID = async (req: Request, res: Response, next: NextFunction) => {
    await param('budgetId')
        .isInt().withMessage("Invalid ID")
        //Condition must return false to trigger the check
        .custom(value => value > 0).withMessage("Invalid ID")
        .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(409).json({ errors: errors.array() })
    }
    next()
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {
    //req.params return values saved in the URL
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            const error = new Error('Budget not found')
            res.status(404).json({ error: error.message })
            return
        }
        req.budget = budget
        next()
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name')
        .notEmpty().withMessage("Budget's name cannot be empty").run(req)
    await body('amount')
        .notEmpty().withMessage("Budget's amount cannot be empty")
        .isNumeric().withMessage("Invalid amount")
        //Condicion must return false to trigger the check
        .custom(value => value > 0).withMessage("Budget's amount must be greater than 0").run(req)
    next()
}