const config = require("../config");
const { Client } = require("pg");

async function query(params) {
  const client = new Client(config.db);
  client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  const results = await client.query(params);
  client.end;
  return results.rows;
}

module.exports = { query };
