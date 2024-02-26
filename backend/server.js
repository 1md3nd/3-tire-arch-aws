const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const Todo = require("./models/todo");
const routes = require("./routes");
const port = 3001;


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
