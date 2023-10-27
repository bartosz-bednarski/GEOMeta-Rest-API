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
      for (let x = 0; x < 4; x++) {
        dataWithId[x] = { ...dataWithId[x], id: x };
      }
      let answer = Math.round(Math.random() * (3 - 1) + 1);
      dataWithId = {
        ...dataWithId,
        answer: jwt.sign(answer, process.env.QUIZ_ANSWER_TOKEN_SECRET),
      };

      let question = dataWithId[answer].country_name;
      dataWithId = {
        ...dataWithId,
        question: question,
      };

      for (let x = 0; x < 4; x++) {
        delete dataWithId[x].country_name;
      }
      response.push(dataWithId);
    }
    res.status(201).json({ message: "Success", data: response });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
module.exports = { getFlags };
