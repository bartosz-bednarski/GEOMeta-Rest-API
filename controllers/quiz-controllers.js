const HttpError = require("../models/http-error");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

//Flags
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
      let answer = Math.round(Math.random() * (3 - 1) + 1).toString();
      let question = response[x].data[answer].country_name;
      console.log(await bcrypt.hash(answer, 10));
      response[x] = {
        ...response[x],
        id: x,
        answer: await bcrypt.hash(answer, 10),
        question: question,
      };
      for (let j = 0; j < 4; j++) {
        delete response[x].data[j].country_name;
      }
    }

    res.status(201).json({ message: "Success", data: response });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const postFlags = async (req, res, next) => {
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const postFlagsAuth = async (req, res, next) => {
  const user = req.user.username;
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    const rows = await db.query(
      `update users set flags_quiz_score=(select flags_quiz_score from users where username='${user}')+${
        userScore * 10
      } where username='${user}'`
    );
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};

//Emblems

const getEmblems = async (req, res, next) => {
  try {
    const rows = await db.query(
      "select country_name, emblem from country_details order by RANDOM() limit 20"
    );
    const data = rows;
    let response = [];
    for (let i = 0; i <= 16; i += 4) {
      let dataWithId = data.slice(i, i + 4);
      response.push({ data: dataWithId });
    }
    for (let x = 0; x < 5; x++) {
      let answer = Math.round(Math.random() * (3 - 1) + 1).toString();
      let question = response[x].data[answer].country_name;
      response[x] = {
        ...response[x],
        id: x,
        answer: await bcrypt.hash(answer, 10),
        question: question,
      };
      for (let j = 0; j < 4; j++) {
        delete response[x].data[j].country_name;
      }
    }

    res.status(201).json({ message: "Success", data: response });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const postEmblems = async (req, res, next) => {
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Error server!"), 500);
  }
};

const postEmblemsAuth = async (req, res, next) => {
  const user = req.user.username;
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    const rows = await db.query(
      `update users set emblems_quiz_score=(select emblems_quiz_score from users where username='${user}')+${
        userScore * 10
      } where username='${user}'`
    );
    console.log(rows);
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};

//plates

const getPlates = async (req, res, next) => {
  try {
    const rows = await db.query(
      "select country_name, plate from country_details order by RANDOM() limit 20"
    );
    const data = rows;
    let response = [];
    for (let i = 0; i <= 16; i += 4) {
      let dataWithId = data.slice(i, i + 4);
      response.push({ data: dataWithId });
    }
    for (let x = 0; x < 5; x++) {
      let answer = Math.round(Math.random() * (3 - 1) + 1).toString();
      let question = response[x].data[answer].country_name;
      response[x] = {
        ...response[x],
        id: x,
        answer: await bcrypt.hash(answer, 10),
        question: question,
      };
      for (let j = 0; j < 4; j++) {
        delete response[x].data[j].country_name;
      }
    }

    res.status(201).json({ message: "Success", data: response });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};

const postPlates = async (req, res, next) => {
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Error server!"), 500);
  }
};

const postPlatesAuth = async (req, res, next) => {
  const user = req.user.username;
  try {
    const data = req.body;
    let userScore = 0;
    const userCorrectAnswers = [];

    for (let i = 0; i < data.length; i++) {
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        true
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "correct",
        });
        userScore += 1;
      }
      if (
        (await bcrypt.compare(data[i].user_answer, data[i].correct_answer)) ==
        false
      ) {
        userCorrectAnswers.push({
          question_number: i,
          userAnswer: "wrong",
        });
      }
    }
    const rows = await db.query(
      `update users set plates_quiz_score=(select plates_quiz_score from users where username='${user}')+${
        userScore * 10
      } where username='${user}'`
    );
    console.log(rows);
    res.status(201).json({
      message: "ok",
      data: {
        user_score: userScore * 10,
        user_correct_answers: userCorrectAnswers,
      },
    });
  } catch (err) {
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
module.exports = {
  getFlags,
  postFlags,
  postFlagsAuth,
  getEmblems,
  postEmblems,
  postEmblemsAuth,
  getPlates,
  postPlates,
  postPlatesAuth,
};
