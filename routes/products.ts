import { Router } from "express";
import { Product, Products, History, sequelize, Category } from "../db/db";
import { Op } from "sequelize";
const productsRouter = Router();
productsRouter.post("/", async (req, res) => {
    const crproduct = await Products.create(req.body);
    await History.create({
        products_id: crproduct.id,
        type: "kirim",
        quantity: req.body.quantity,
        date: req.body.date,
    });
    res.send(crproduct.id);
});

productsRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const search = req.query.search ? req.query.search : "";
        const category_id = req.query.category_id;
        let whereClause: any = {};
        if (category_id !== undefined) {
            whereClause = {
                category_id: {
                    [Op.eq]: category_id,
                },
                name: {
                    [Op.iLike]: `${search}%`,
                },
            };
        } else {
            whereClause = {
                name: {
                    [Op.iLike]: `${search}%`,
                },
            };
        }
        const Maxsulotlar = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["name"],
                },
                {
                    model: Products,
                    where: {
                        quantity: { [Op.gt]: 0 },
                    },
                },
            ],
            where: whereClause,

            limit: limit as number,
            offset: offset as number,
        });
        const Total_sum: any = await Products.findOne({
            attributes: [
                [
                    sequelize.fn(
                        "sum",
                        sequelize.literal(
                            '"products"."price" * "products"."quantity"'
                        )
                    ),
                    "total_sum",
                ],
            ],
        });

        const count = await Product.count({
            where: {
                name: {
                    [Op.iLike]: `${search}%`,
                },
            },
        });
        const total_sum = Total_sum.get("total_sum");
        const response = { count, total_sum, Maxsulotlar };
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

productsRouter.put("/", async (req, res) => {
    try {
        const which_product = await Product.findByPk(req.body.product_id);
        if (which_product) {
            let { quantity, product_id, date } = req.body;
            if (req.body.products_id) {
                const { products_id } = req.body;
                await Products.update({ quantity }, { where: { products_id } });
            }
            const products = await Products.findAll({ where: { product_id } });
            let quantity1 = quantity;
            for (const product of products) {
                if (quantity1 <= 0) {
                    break;
                }
                const { quantity, id } = product;
                if (quantity === 0) {
                    continue;
                }

                if (quantity > quantity1) {
                    const this_product = await Products.update(
                        { quantity: quantity - quantity1 },
                        { where: { id } }
                    );
                    await History.create({
                        products_id: id,
                        type: "chiqim",
                        date,
                        quantity: quantity1,
                    });
                    quantity1 = 0;
                } else {
                    await Products.update({ quantity: 0 }, { where: { id } });
                    await History.create({
                        products_id: id,
                        type: "chiqim",
                        date,
                        quantity,
                    });
                    quantity1 = quantity1 - quantity;
                }
            }
        } else {
            console.log("Product not found");
        }

        res.send("all righty then");
    } catch (error) {
        console.error("Error updating product:", error);
    }
});

export { productsRouter };
