import { Router } from "express";
import { AuthorizationModel } from "../db/db";
import { Op } from "sequelize";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const role = await AuthorizationModel.create(req.body);
        res.send(role);
    } catch (err) {
        res.send(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const username = req.body.name;
        const password = req.body.password;
        const user = AuthorizationModel.findOne({
            where: { name: username, password: password },
        });
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});
router.delete("/", async (req, res) => {
    try {
        const username = req.body.name;
        const password = req.body.password;
        const user = AuthorizationModel.destroy({
            where: { username: username, password: password },
        });
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});
router.patch("/", async (req, res) => {
    try {
        const username = req.body.name;
        const password = req.body.password;
        const user = AuthorizationModel.update(
            { password: req.body.newpassword },
            {
                where: { username: username, password: password },
            }
        );
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});
export default router;
