import { Router } from "express"
import { BudgetController } from "../controllers/BudgetController"
import { handleInputError } from "../middleware/validation"
import { validateBudgetExist, validateBudgetID, validateBudgetInput } from '../middleware/budget';

const router = Router()

router.param('budgetId', validateBudgetID)
router.param('budgetId', validateBudgetExist)

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
router.delete('/:budgetId',
    BudgetController.deleteById)

export default router