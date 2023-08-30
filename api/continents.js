const express = require("express");
const router = express.Router();
const continents = require("../services/continents");

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
