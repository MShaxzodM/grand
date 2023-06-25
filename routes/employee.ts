import { Router } from "express";
import { PositionModel, AttendanceModel, EmployeeModel } from "../db/db";
import { Op } from "sequelize";
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

employeeRouter.get("/attendance", async (req, res) => {
    const month = req.query.month ? req.query.month : "%";
    const data = await EmployeeModel.findAll({
        include: [AttendanceModel],
        where: {
            date: {
                [Op.like]: `%-${month}-%`,
            },
        },
        order: [[AttendanceModel, "date"]],
    });
});

employeeRouter.post("/attendance", async (req, res) => {
    try {
        const attendance = await AttendanceModel.create(req.body);
        res.send(attendance.id);
    } catch (error) {
        res.send(error);
    }
});

export { employeeRouter, positionRouter };
