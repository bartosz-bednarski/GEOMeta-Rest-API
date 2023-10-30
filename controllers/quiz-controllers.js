const HttpError = require("../models/http-error");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const getFlags = async (req, res, next) => {
  try {
    const rows = await db.query(
      "select country_name, country_flag from country_details order by RANDOM() limit 20"
    );
    const data = rows;
    let response = [];
    for (let i = 0; i <= 16; i += 4) {
      let dataWithId = data.slice(i, i + 4);
      response.push({ data: dataWithId });
    }
    for (let x = 0; x < 5; x++) {
      let answer = Math.round(Math.random() * (3 - 1) + 1);
      let question = response[x].data[answer].country_name;
      response[x] = {
        ...response[x],
        id: x,
        answer: jwt.sign(answer, process.env.QUIZ_ANSWER_TOKEN_SECRET),
        question: question,
      };
      for (let j = 0; j < 4; j++) {
        delete response[x].data[j].country_name;
      }
    }

    res.status(201).json({ message: "Success", data: response });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
module.exports = { getFlags };
