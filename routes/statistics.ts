import { History, Product, Products, sequelize } from "../db/db";
import { Router } from "express";
import { Op } from "sequelize";
const StatisticsRouter = Router();

StatisticsRouter.get("/", async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : "";
        const startDate = req.query.startDate
            ? req.query.startDate
            : "2023-01-01";
        const endDate = req.query.endDate ? req.query.endDate : new Date();
        const type = req.query.type ? req.query.type : "";
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const statistics = await History.findAll({
            include: [
                {
                    model: Products,
                    attributes: ["price"],
                    include: [
                        {
                            model: Product,
                            where: {
                                name: {
                                    [Op.iLike]: `${search}%`,
                                },
                            },
                            attributes: ["name", "quantity_type"],
                            as: "Maxsulot",
                        },
                    ],
                    required: true,
                },
            ],
            attributes: [
                "id",
                "type",
                "date",
                "quantity",
                [
                    sequelize.literal(
                        `"product_history"."quantity" * product.price`
                    ),
                    "summ",
                ],
            ],
            where: {
                type: {
                    [Op.iLike]: `${type}%`,
                },
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },

            limit: limit as number,
            offset: offset as number,
        });

        res.send(statistics);
    } catch (err) {
        res.send(err);
    }
});
export { StatisticsRouter };
