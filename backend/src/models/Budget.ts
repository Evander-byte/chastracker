import { Column, DataType, HasMany, Model, Sequelize, Table } from "sequelize-typescript"

@Table({
    tableName: 'budgets'
})

class Budget extends Model{
    //Definición de quelize para la columna
    @Column({
        type: DataType.STRING(100)
    })
    //Tipado de typescript
    declare name: string
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number
}

export default Budget
