// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const stockapi = require("./routes/stockRoutes");
const salesapi = require("./routes/salesRoutes");
const userapi = require("./routes/userRoutes");
require('dotenv').config()


// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;


// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Configure the CORs middleware
app.use(cors());

app.use(cookieParser());

// Require Route
app.use("/api/stock", stockapi);
app.use("/api/sales", salesapi);

app.use("/api/user", userapi);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {

    console.log("prod activated");

    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
}

// Catch any bad requests
app.get("*", (req, res) => {
    res.status(404).send();
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));