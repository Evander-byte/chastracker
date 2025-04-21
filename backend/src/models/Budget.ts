import { Column, DataType, HasMany, Model, Table, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript"
import Expense from "./Expense"
import User from "./User"

@Table({
    tableName: 'budgets'
})

class Budget extends Model{
    @AllowNull(false)
    //Define of sequelize about colums
    @Column({
        type: DataType.STRING(100)
    })
    //Type of typescript
    declare name: string
    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    //User ID
    @ForeignKey(() => User)
    declare userId: number

    //Relation indentifyer with User model
    @BelongsTo(() => User)
    declare user: User

    @HasMany(() => Expense, {
        //Integrity restrictions
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })


    declare expenses: Expense[]
}

export default Budget

