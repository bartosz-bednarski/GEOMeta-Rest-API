const express = require("express");
const bodyParser = require("body-parser");
const continentsRoutes = require("./routes/continents-routes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: ["https://geo-meta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    "Access-Control-Allow-Origin": "*",
  })
);
app.use("/api/continents", continentsRoutes);

app.listen("geo-meta-rest-api.vercel.app");
