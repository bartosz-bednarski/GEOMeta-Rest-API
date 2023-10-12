const db = require("./db");

async function getAfricaCountries() {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'africa')`
  );
  const data = rows;
  return { data };
}
async function getNorthAmericaCountries() {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'northamerica')`
  );
  const data = rows;

  return {
    data,
  };
}
async function getSouthAmericaCountries() {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'southamerica')`
  );
  const data = rows;

  return {
    data,
  };
}
async function getOceaniaCountries() {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'oceania')`
  );
  const data = rows;

  return {
    data,
  };
}
async function getAsiaCountries(page = 1) {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'asia')`
  );
  const data = rows;

  return {
    data,
  };
}
async function getEuropeCountries(page = 1) {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'europe')`
  );
  const data = rows;

  return {
    data,
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
