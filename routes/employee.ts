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
positionRouter.get("/", async (req, res) => {
    try {
        const positions = await PositionModel.findAll();
        res.send(positions);
    } catch (err) {
        res.send(err);
    }
});
const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : "";
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const employees = await EmployeeModel.findAll({
            include: { model: PositionModel, attributes: ["title", "salary"] },
            where: {
                name: {
                    [Op.iLike]: `${search}%`,
                },
                surname: {
                    [Op.iLike]: `${search}%`,
                },
            },
            limit: limit as number,
            offset: offset as number,
        });
        const count = await EmployeeModel.count({
            where: {
                name: {
                    [Op.iLike]: `${search}%`,
                },
                surname: {
                    [Op.iLike]: `${search}%`,
                },
            },
        });
        const response = { count, employees };
        res.send(response);
    } catch (err) {
        res.send(err);
    }
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
    try {
        const month = req.query.month ? req.query.month : "%";
        const data = await EmployeeModel.findAll({
            include: [
                {
                    model: AttendanceModel,
                },
            ],
            order: [[AttendanceModel, "date", "ASC"]],
        });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
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
