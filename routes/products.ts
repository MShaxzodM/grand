import { Router } from "express";
import { Product, Products, History, sequelize } from "../db/db";

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

        const products = await Product.findAll({
            include: [Products],
            where: {
                name: {
                    [Op.iLike]: `${search}%`,
                },
            },
            limit: limit as number,
            offset: offset as number,
        });
        res.send(products);
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
