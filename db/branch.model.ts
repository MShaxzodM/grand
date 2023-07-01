import { sequelize } from "./db";
import { Model, DataTypes } from "sequelize";
class BranchModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}
BranchModel.init(
    {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "branch", // We need to choose the model name
    }
);

export default BranchModel;
