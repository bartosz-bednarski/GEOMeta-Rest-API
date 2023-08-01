const express = require("express");
const bodyParser = require("body-parser");
const continentsRoutes = require("./routes/continents-routes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    "Access-Control-Allow-Origin": "*",
  })
);
app.use("/api/continents", continentsRoutes);

app.listen(5000);
