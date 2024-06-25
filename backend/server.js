const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes");
const port = 3001;

main().catch((err) => console.log(err));

async function main() {
    const app = express();

    // Use morgan for logging HTTP requests
    app.use(morgan('dev'));

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
