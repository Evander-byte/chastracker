import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {
    static getAll = async (req: Request, res: Response) => {
    
    }
  
    static create = async (req: Request, res: Response) => {
       try {
        const expense = new Expense(req.body)
        expense.budgetId = req.budget.id
        expense.save()
        res.status(201).json("Expense added successfully")
       } catch (error) {
        res.status(500).send("Server Error")
       }
    }
  
    static getById = (req: Request, res: Response) => {
        res.json(req.expense)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)
        res.status(201).json("Updated expense")
    }
  
    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()
        res.status(201).json("Deleted expense")
    }
}