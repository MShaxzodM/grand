import { Router } from "express";
import { EmployeeModel } from "../db/db";
import { PositionModel } from "../db/db";

const positionRouter = Router();
positionRouter.post("/", async (req, res) => {
    try {
        const currentPosition = await PositionModel.create(req.body);
        res.send(currentPosition.id);
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
});

const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
    const employees = await PositionModel.findAll({
        include: [EmployeeModel],
        where: {
            id: 1,
        },
    });
    res.send(employees);
});

employeeRouter.post("/", async (req, res) => {
    try {
        const employee = EmployeeModel.create(req.body);
        res.send("Employee created successfully");
    } catch {
        res.send("something went wrong");
    }
});
export { employeeRouter, positionRouter };
