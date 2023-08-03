import { Router } from "express";
import { Category, Product, Products } from "../db/db";

const categoryRouter = Router();
categoryRouter.post("/", async (req, res) => {
    const crCat = await Category.create(req.body);
    res.send(crCat);
});
categoryRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.send(categories);
    } catch (err) {
        res.send(err);
    }
});

categoryRouter.get("/:id", async (req, res) => {
    try {
        const products = await Category.findOne({
            include: { model: Product, include: [Products] },
            where: { id: req.params.id },
        });
        res.send(products);
    } catch (err) {
        res.send(err);
    }
});
export { categoryRouter };
