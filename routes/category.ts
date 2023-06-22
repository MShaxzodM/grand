import { Router } from "express";
import { Category } from "../db/db";

const categoryRouter = Router();
categoryRouter.post("/", async (req, res) => {
    const crCat = await Category.create(req.body);
    res.send(crCat.id);
});
export { categoryRouter };
