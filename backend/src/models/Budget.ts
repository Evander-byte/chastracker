import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import Expense from "./Expense"

@Table({
    tableName: 'budgets'
})

class Budget extends Model{
    //Define of sequelize about colums
    @Column({
        type: DataType.STRING(100)
    })
    //Type of typescript
    declare name: string
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    @HasMany(() => Expense, {
        //Integrity restrictions
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]
}

export default Budget

