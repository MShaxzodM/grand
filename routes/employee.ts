import { Router } from "express";
import {
    PositionModel,
    AttendanceModel,
    SalaryModel,
    EmployeeModel,
    sequelize,
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
        res.send(salary);
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
        const limit = req.query.limit ? req.query.limit : 10;
        const offset = req.query.offset ? req.query.offset : 0;
        const currentDate = new Date();
        const month = req.query.month
            ? req.query.month
            : currentDate.getMonth();
        const startOfMonth = new Date(
            currentDate.getFullYear(),
            month as number,
            1
        );
        const endOfMonth = new Date(
            currentDate.getFullYear(),
            (month as number) + 1,
            0
        );
        const data = await EmployeeModel.findAll({
            limit: limit as number,
            offset: offset as number,
        });
        const resp = await Promise.all(
            data.map(async (element: any) => {
                const { id } = element;
                const attendance: any = [];
                const crntDate = new Date(startOfMonth);
                while (crntDate <= endOfMonth) {
                    const attendanceexists = await AttendanceModel.findOne({
                        where: {
                            employee_id: id,
                            date: crntDate,
                        },
                        attributes: ["status", "date"],
                    });
                    if (attendanceexists) {
                        attendance.push(attendanceexists);
                    } else {
                        attendance.push({
                            status: "Not Selected",
                            date: crntDate.toISOString().substr(0, 10),
                        });
                    }

                    crntDate.setDate(crntDate.getDate() + 1);
                }

                return { element, attendance };
            })
        );
        res.send(resp);
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
employeeRouter.get("/:id", async (req, res) => {
    try {
        const currentDate = new Date();
        const month = req.query.month
            ? req.query.month
            : currentDate.getMonth();
        const startOfMonth = new Date(
            currentDate.getFullYear(),
            month as number,
            1
        );
        const endOfMonth = new Date(
            currentDate.getFullYear(),
            (month as number) + 1,
            0
        );
        const employee: any = await EmployeeModel.findOne({
            include: [
                { model: PositionModel, attributes: ["title", "salary"] },
                {
                    model: SalaryModel,
                    where: {
                        date: {
                            [Op.between]: [startOfMonth, endOfMonth],
                        },
                    },
                    required: false,
                },
            ],
            where: {
                id: req.params.id,
            },
        });
        const attendance: any = [];
        const crntDate = new Date(startOfMonth);
        while (crntDate <= endOfMonth) {
            console.log(crntDate);
            const attendanceexists = await AttendanceModel.findOne({
                where: {
                    employee_id: req.params.id,
                    date: crntDate,
                },
                attributes: ["status", "date"],
            });
            if (attendanceexists) {
                attendance.push(attendanceexists);
            } else {
                attendance.push({
                    status: "Not Selected",
                    date: crntDate.toISOString().substr(0, 10),
                });
            }
            crntDate.setDate(crntDate.getDate() + 1);
        }
        const oylik: any = await SalaryModel.findOne({
            attributes: [
                [
                    sequelize.fn("sum", sequelize.literal('"salary"."amount"')),
                    "total_sum",
                ],
            ],
        });
        const paid = oylik.get("total_sum");
        const counter = await AttendanceModel.count({
            where: {
                employee_id: req.params.id,
                status: true,
                date: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
            },
        });
        const not_paid = employee.position.salary * counter - paid;
        const salary_total = { paid, not_paid };
        res.send({ employee, salary_total, attendance });
    } catch (err) {
        res.send(err);
    }
});

export { employeeRouter, positionRouter };
