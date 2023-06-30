import { Router } from "express";
import IncomeModel from "./income.model";
import { Op } from "sequelize";

const incomeRouter = Router();

incomeRouter.post("/", async (req, res) => {
    try {
        const income = await IncomeModel.create(req.body);
        res.send(income.id);
    } catch (err) {
        res.send(err);
    }
});
incomeRouter.get("/", async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : "";
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const startDate = req.query.startDate
            ? req.query.startDate
            : "2023-01-01";
        const endDate = req.query.endDate ? req.query.endDate : new Date();
        const Finance_income = await IncomeModel.findAll({
            where: {
                type: {
                    [Op.iLike]: `${search}%`,
                },
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            limit: limit as number,
            offset: offset as number,
        });
        res.send(Finance_income);
    } catch (err) {
        res.send(err);
    }
});
export { incomeRouter };
