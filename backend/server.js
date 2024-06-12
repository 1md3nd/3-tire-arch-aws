const express = require("express");
const cors = require('cors');
const routes = require("./routes");
const port = 3001;

main().catch((err) => console.log(err));

async function main() {
    const app = express();
    app.use(cors({
        origin: '*', // Allow requests from any origin
        methods: 'GET,PUT,POST,DELETE', // Allow specified HTTP methods
        allowedHeaders: 'Content-Type,Authorization', // Allow specified headers
      }));
    app.use(express.json());
    app.use("/api", routes);
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
}
