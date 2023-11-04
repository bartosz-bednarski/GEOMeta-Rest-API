const HttpError = require("../models/http-error");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;
  const username = req.user.username;
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
    passwordDb = await db.query(
      `select password from users where(username='${username}')`
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
  try {
    if (await bcrypt.compare(oldPassword, passwordDb[0].password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newPasswordQuery = await db.query(
        `update users set password='${hashedPassword}' where username='${username}'`
      );
      const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
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

module.exports = { changePassword };
