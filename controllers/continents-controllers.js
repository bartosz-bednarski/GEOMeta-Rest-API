const db = require("./db");

const getAfricaCountries = async () => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'africa')`
  );
  const data = rows;
  return { data };
};
const getNorthAmericaCountries = async () => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'northamerica')`
  );
  const data = rows;

  return {
    data,
  };
};
const getSouthAmericaCountries = async () => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'southamerica')`
  );
  const data = rows;

  return {
    data,
  };
};
const getOceaniaCountries = async () => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'oceania')`
  );
  const data = rows;

  return {
    data,
  };
};
const getAsiaCountries = async (page = 1) => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'asia')`
  );
  const data = rows;

  return {
    data,
  };
};
const getEuropeCountries = async (page = 1) => {
  const rows = await db.query(
    `SELECT countries.country,countries.img FROM countries,continents WHERE (countries.continent_id = continents.continent_id AND continents.continent = 'europe')`
  );
  const data = rows;

  return {
    data,
  };
};

module.exports = {
  getAfricaCountries,
  getNorthAmericaCountries,
  getSouthAmericaCountries,
  getAsiaCountries,
  getOceaniaCountries,
  getEuropeCountries,
};
