import { History } from "../db/db";
import { Router } from "express";
const StatisticsRouter = Router();

StatisticsRouter.get("/", async (req, res) => {
    try {
        const statistics = await History.findAll({ group: "products_id" });

        res.send(statistics);
    } catch (err) {
        res.send(err);
    }
});
export { StatisticsRouter };