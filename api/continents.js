const express = require("express");
const router = express.Router();
const continents = require("../services/continents");
// const { Client } = require("pg");
// require("dotenv");

// const client = new Client({
//   host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

router.get("/", async (req, res, next) => {
  try {
    res.json({ message: "Working well" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/africa", async function (req, res, next) {
  try {
    res.json(await continents.getAfricaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/northAmerica", async function (req, res, next) {
  try {
    res.json(await continents.getNorthAmericaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/southAmerica", async function (req, res, next) {
  try {
    res.json(await continents.getSouthAmericaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/asia", async function (req, res, next) {
  try {
    res.json(await continents.getAsiaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/oceania", async function (req, res, next) {
  try {
    res.json(await continents.getOceaniaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/europe", async function (req, res, next) {
  try {
    res.json(await continents.getEuropeCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;
