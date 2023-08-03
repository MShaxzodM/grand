import { Router } from "express";
import OutgoneModel from "../db/outgoing.model";
import { Op } from "sequelize";
const expense_router = Router();

expense_router.post("/", async (req, res) => {
    try {
        const expense = await OutgoneModel.create(req.body);
        res.send(expense);
    } catch (err) {
        res.send(err);
    }
});

expense_router.get("/", async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : "";
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const startDate = req.query.startDate
            ? req.query.startDate
            : "2023-01-01";
        const endDate = req.query.endDate ? req.query.endDate : new Date();
        const Finance_outgone = await OutgoneModel.findAll({
            where: {
                description: {
                    [Op.iLike]: `${search}%`,
                },
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            limit: limit as number,
            offset: offset as number,
        });
        const count = await OutgoneModel.count({
            where: {
                description: {
                    [Op.iLike]: `${search}%`,
                },
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });
        res.send({ count, Finance_outgone });
    } catch (err) {
        res.send(err);
    }
});

export default expense_router;
