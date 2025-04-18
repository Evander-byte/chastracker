import { Router } from "express"
import { BudgetController } from "../controllers/BudgetController"
import { handleInputError } from "../middleware/validation"
import { validateBudgetExist, validateBudgetID, validateBudgetInput } from '../middleware/budget';
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExist, validateExpenseId, validateExpenseInput } from "../middleware/expense";

const router = Router()

router.param('budgetId', validateBudgetID)
router.param('budgetId', validateBudgetExist)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExist)

router.get('/', BudgetController.getAll)
router.post('/', 
    validateBudgetInput,
    handleInputError,
    BudgetController.create)
router.get('/:budgetId', 
    BudgetController.getById)
router.put('/:budgetId', 
    validateBudgetInput,
    handleInputError,
    BudgetController.updateById)
router.delete('/:budgetId',BudgetController.deleteById)

//Routes for expenses

//ROA PATTERN

router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputError,
    ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputError,
    ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router