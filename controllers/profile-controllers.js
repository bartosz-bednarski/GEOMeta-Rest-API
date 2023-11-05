const HttpError = require("../models/http-error");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
  try {
    const data = await db.query(
      `select username_short,flags_quiz_score,emblems_quiz_score,plates_quiz_score,flags_quiz_counter,emblems_quiz_counter,plates_quiz_counter from users where username='${req.user.username}'`
    );
    const profileData = await data;
    res.status(201).json({
      message: "ok",
      body: {
        username_short: profileData[0].username_short,
        flags_quiz_score: profileData[0].flags_quiz_score,
        emblems_quiz_score: profileData[0].emblems_quiz_score,
        plates_quiz_score: profileData[0].plates_quiz_score,
        flags_quiz_counter: profileData[0].flags_quiz_counter,
        emblems_quiz_counter: profileData[0].emblems_quiz_counter,
        plates_quiz_counter: profileData[0].plates_quiz_counter,
      },
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
};
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;
  let passwordDb;
  if (
    oldPassword.length < 6 ||
    newPassword.length < 6 ||
    newPasswordConfirm.length < 6
  ) {
    return next(new HttpError("One or more passwords are too short"), 500);
  }
  if (newPassword !== newPasswordConfirm) {
    return next(new HttpError("New passwords are different"), 500);
  }
  try {
    const data = await db.query(
      `select password from users where(username='${req.user.username}')`
    );
    passwordDb = await data;
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
  try {
    if (await bcrypt.compare(oldPassword, await passwordDb[0].password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newPasswordQuery = await db.query(
        `update users set password='${hashedPassword}' where username='${req.user.username}'`
      );
      const user = { username: req.user.username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(201).json({
        body: {
          accessToken: accessToken,
        },
        message: "Password changed",
      });
    } else {
      return next(new HttpError("Old password is wrong"), 500);
    }
  } catch (err) {
    console.log("err2", err);
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
};

const changeShortname = async (req, res, next) => {
  const { usernameShort } = req.body;
  if (usernameShort.length > 2) {
    return next(new HttpError("Shortname too long"), 500);
  }
  if (usernameShort.length < 2) {
    return next(new HttpError("Shortname too short"), 500);
  }
  if (usernameShort.length === 0) {
    return next(new HttpError("Shortname empty"), 500);
  }
  try {
    await db.query(
      `update users set username_short='${usernameShort}' where username='${req.user.username}'`
    );
    res.status(201).json({
      body: {
        usernameShort: usernameShort,
      },
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
};
module.exports = { changePassword, changeShortname, getProfile };
