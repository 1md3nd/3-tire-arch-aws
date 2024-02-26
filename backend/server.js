const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const Todo = require("./models/todo");
const routes = require("./routes");
const port = 3001;

const sql_port = process.env.PORT;
const hostName = process.env.HOST;
const userName = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const pool = mysql.createPool({
    port: sql_port,
    host: hostName,
    user: userName,
    password: password,
    database: database,
    connectionLimit: 10 
});

main().catch((err) => console.log(err));

async function main() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
}
