const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAfricaCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "africa" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getNorthAmericaCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "northamerica" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getSouthAmericaCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "southamerica" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getOceaniaCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "oceania" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getAsiaCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "asia" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getEuropeCountries(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE countries.continent_id = continents.continents_id AND continents.continent = "europe" LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getAfricaCountries,
  getNorthAmericaCountries,
  getSouthAmericaCountries,
  getAsiaCountries,
  getOceaniaCountries,
  getEuropeCountries,
};
