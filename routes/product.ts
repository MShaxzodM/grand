import { Router } from "express";
import { Product } from "../db/db";
import { productsRouter } from "./products";
const product = Router();
product.use("/products", productsRouter);
product.post("/", async (req: any, res: any) => {
    const produc = await Product.create(req.body);
    res.send(produc.id);
});

export { product };
