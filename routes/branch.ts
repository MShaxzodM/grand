import BranchModel from "../db/branch.model";
import { Router } from "express";

const branch_router = Router();

branch_router.get("/", async (req, res) => {
    try {
        const branches = await BranchModel.findAll();
        res.send(branches);
    } catch (err) {
        res.send(err);
    }
});

branch_router.post("/", async (req, res) => {
    try {
        const idbranch = await BranchModel.create(req.body);
        res.send(idbranch);
    } catch (err) {
        res.send(err);
    }
});
branch_router.delete("/", async (req, res) => {
    try {
        await BranchModel.destroy({
            where: {
                id: req.query.id,
            },
        });
        res.send("Filial deleted successfully");
    } catch (err) {
        res.send("Couldnt delete");
    }
});
export default branch_router;
