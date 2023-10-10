const express = require("express");
const router = express.Router();
const getCountry = require("../services/countries");
router.get("/:country", async (req, res, next) => {
  const country = req.params.country;
  try {
    res.json(await getCountry(country));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;
