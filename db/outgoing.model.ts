import { sequelize } from "./db";
import { Model, DataTypes } from "sequelize";
class OutgoneModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}
OutgoneModel.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "finance_outgoing",
    }
);

export default OutgoneModel;
