import { sequelize } from "./db";
import { Model, DataTypes } from "sequelize";
class IncomeModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}
IncomeModel.init(
    {
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        type: {
            type: "bot" || "dostavka" || "kassa",
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "finance_income", // We need to choose the model name
    }
);

export default IncomeModel;
