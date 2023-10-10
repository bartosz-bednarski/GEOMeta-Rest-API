const db = require("./db");

async function getCountryDetails(country) {
  const rows = await db.query(
    `SELECT country_name,capitol,currency,temperature,movement,website,country_flag,emblem,plate FROM country_details WHERE (country_name='${country}')`
  );
  const data = rows;
  return { data };
}
module.exports = getCountryDetails;
