import bodyParser from "body-parser";
// import { Auth } from "./auth";
import { config } from "dotenv";
import express from "express";
import { categoryRouter } from "./routes/category";
import { product } from "./routes/product";
import { employeeRouter, positionRouter } from "./routes/employee";
import { StatisticsRouter } from "./routes/statistics";
import { incomeRouter } from "./routes/income";
import Branch from "./routes/branch";
import cors from "cors";
import expense_router from "./routes/expense";
import authorization from "./routes/authorization";
// import {  } from "./db/db";
config();
const app = express();
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Replace with the actual origin you want to allow
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/favicon.ico", (req, res) => {
    res.send("favicon");
});

// app.use("/uploads",Auth, express.static("uploads"));
app.use("/position", positionRouter);
app.use("/product", product);
app.use("/employees", employeeRouter);
app.use("/category", categoryRouter);
app.use("/stats", StatisticsRouter);
app.use("/income", incomeRouter);
app.use("/expense", expense_router);
app.use("/branch", Branch);
app.use("/authorization", authorization);

// app.post("/auth", Auth, (req: any, res) => {
//     res.send("Siz muvaffaqiyatli royhatdan otdingiz");
// });
app.listen(process.env.PORT, () => console.log("Goo"));
