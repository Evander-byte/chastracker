import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: 'expenses'
})

class Expense extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    //Budget IDs
    @ForeignKey(() => Budget)
    declare budgetId: number

    //Relation identifyer with Budget model
    @BelongsTo(() => Budget)
    declare budget: Budget
}

export default Expense