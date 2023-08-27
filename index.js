const express = require("express");
const bodyParser = require("body-parser");
const continentsRoutes = require("./api/continents");
// const cors = require("cors");
const app = express();
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "https://geo-meta.vercel.app");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   // res.setHeader("Access-Control-Allow-Credentials", false);

//   // Pass to next layer of middleware
//   next();
// });
const PORT = process.env.PORT || 9001;
app.use("/api/continents", continentsRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
