import { Sequelize, DataTypes, Model } from "sequelize";
import { config } from "dotenv";
config();
// Create database object
const sequelize = new Sequelize(
    "grand",
    "postgres",
    process.env.POSTGRES_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    }
);

class Product extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

Product.init(
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity_type: {
            type: "kg" || "dona" || "litr",
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "product", // We need to choose the model name
    }
);

class Products extends Model {
    [x: string]: any;
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

Products.init(
    {
        // Model attributes are defined here

        product_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        price: { type: DataTypes.NUMBER, allowNull: false },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "products", // We need to choose the model name
    }
);
class History extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

History.init(
    {
        // Model attributes are defined here

        products_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        type: {
            type: "kirim" || "chiqim",
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "product_history", // We need to choose the model name
    }
);
class Category extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

Category.init(
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "category", // We need to choose the model name
    }
);
class PositionModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

PositionModel.init(
    {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "position", // We need to choose the model name
    }
);

class EmployeeModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

EmployeeModel.init(
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "employee", // We need to choose the model name
    }
);

export { Product, Products, Category, History, PositionModel, EmployeeModel };
