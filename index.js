const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const continentsRoutes = require("./api/continents");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
const PORT = process.env.PORT || 9001;

app.use("/api/continents", continentsRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
