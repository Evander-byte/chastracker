import { Request, Response } from "express"
import Budget from "../models/Budget"
import { body } from 'express-validator';

export class BudgetController {
    //Los metodos estaticos no se instancian
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                //TODO: Filter query by user id
            })
            res.status(200).send(budgets)
        } catch (error) {
            // console.log(error)
            res.status(500).json({error: "Server error"})
        }
    }
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Budget created correctly')
        } catch (error) {
            res.status(500).json({error: "Server Error"})

        }
    }
    static getById = (req: Request, res: Response) => {
        res.json(req.budget)
    }
    static updateById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.status(201).send("Updated budget")
    }
    static deleteById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.status(201).send("Deleted Budget")
    }
}
                                                                                      