import { Router } from "express";
import {
    PositionModel,
    AttendanceModel,
    SalaryModel,
    EmployeeModel,
} from "../db/db";
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
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `${search}%`,
                        },
                    },
                    {
                        surname: {
                            [Op.iLike]: `${search}%`,
                        },
                    },
                ],
            },
            limit: limit as number,
            offset: offset as number,
        });
        const count = await EmployeeModel.count({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `${search}%`,
                        },
                    },
                    {
                        surname: {
                            [Op.iLike]: `${search}%`,
                        },
                    },
                ],
            },
        });
        const response = { count, employees };
        res.send(response);
    } catch (err) {
        res.send(err);
    }
});

employeeRouter.post("/salary", async (req, res) => {
    try {
        const salary = await SalaryModel.create(req.body);
        res.send(salary.id);
    } catch (err) {
        res.send(err);
    }
});
employeeRouter.get("/salary", async (req, res) => {
    try {
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const search = req.query.search ? req.query.search : "";
        const employee_id = req.query.employee_id;
        let whereClause: any = {};
        if (employee_id !== undefined) {
            whereClause = {
                employee_id: {
                    [Op.eq]: employee_id,
                },
            };
        } else {
            whereClause = true;
        }
        const salary = await SalaryModel.findAll({
            include: [
                {
                    model: EmployeeModel,
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `${search}%`,
                                },
                            },
                            {
                                surname: {
                                    [Op.iLike]: `${search}%`,
                                },
                            },
                        ],
                    },
                },
            ],
            // where: whereClause,
            limit: limit as number,
            offset: offset as number,
        });
        const count = await SalaryModel.count({
            include: [
                {
                    model: EmployeeModel,
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `${search}%`,
                                },
                            },
                            {
                                surname: {
                                    [Op.iLike]: `${search}%`,
                                },
                            },
                        ],
                    },
                },
            ],
        });
        const response = { count, salary };
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
