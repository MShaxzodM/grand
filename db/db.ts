import { Sequelize, DataTypes, Model } from "sequelize";
import { config } from "dotenv";
config();
// Create database object
const sequelize = new Sequelize(
    "grand",
    "postgres",
    process.env.POSTGRES_PASSWORD,
    {
        port: 5432,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity_type: {
            type: DataTypes.STRING,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: { type: DataTypes.INTEGER, allowNull: false },
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salaryType: {
            type: DataTypes.STRING,
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
            type: DataTypes.INTEGER,
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
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
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
class AuthorizationModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

AuthorizationModel.init(
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
        role: {
            type: DataTypes.STRING,
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "authorization", // We need to choose the model name
    }
);
class AttendanceModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}
AttendanceModel.init(
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "attendance", // We need to choose the model name
    }
);

class SalaryModel extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}
SalaryModel.init(
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        timestamps: false,
        freezeTableName: true,
        modelName: "salary", // We need to choose the model name
    }
);
EmployeeModel.hasMany(SalaryModel, { foreignKey: "employee_id" });
SalaryModel.belongsTo(EmployeeModel, { foreignKey: "employee_id" });
EmployeeModel.hasMany(AttendanceModel, { foreignKey: "employee_id" });
AttendanceModel.belongsTo(EmployeeModel, { foreignKey: "employee_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });
PositionModel.hasMany(EmployeeModel, { foreignKey: "position_id" });
EmployeeModel.belongsTo(PositionModel, { foreignKey: "position_id" });
Product.hasMany(Products, { foreignKey: "product_id" });
Products.belongsTo(Product, { as: "Maxsulot", foreignKey: "product_id" });
History.belongsTo(Products, { foreignKey: "products_id" });
Products.hasMany(History, { foreignKey: "products_id" });
// sequelize.sync({ force: true });
export {
    sequelize,
    AuthorizationModel,
    Product,
    Products,
    Category,
    History,
    PositionModel,
    SalaryModel,
    EmployeeModel,
    AttendanceModel,
};
