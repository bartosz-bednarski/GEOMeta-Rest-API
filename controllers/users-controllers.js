const HttpError = require("../models/http-error");
const db = require("./db");
const bcrypt = require("bcrypt");
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  let userNameCheck;
  let userEmailCheck;
  if (username.length === 0 || password.length < 6 || email.length === 0) {
    return next(new HttpError("Login,password or email too short"), 500);
  }
  try {
    userNameCheck = await db.query(
      `select username from users where(username='${username}')`
    );
    userEmailCheck = await db.query(
      `select email from users where(email='${email}')`
    );
  } catch (err) {
    const error = new HttpError("Failed to connect with db", 500);
    return next(error);
  }
  if (userNameCheck.length === 0 && userEmailCheck.length === 0) {
    console.log(username);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        `INSERT INTO "users" ("username","email","password") VALUES ('${username}','${email}','${hashedPassword}')`
      );
    } catch (err) {
      const error = new HttpError("Failed to register, check your data!", 500);
      return next(error);
    }
  } else if (userNameCheck.length !== 0) {
    return next(new HttpError("Username already exists!"));
  } else if (userEmailCheck.length !== 0) {
    return next(new HttpError("Email already exists!"));
  }
  res.status(201).json({ message: "registered" });
};
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  let userDb;
  if (username.length === 0 || password.length === 0) {
    return next(new HttpError("Login or password too short"), 500);
  }
  try {
    userDb = await db.query(
      `select username,password from users where(username='${username}')`
    );
  } catch (err) {
    return next(new HttpError("Failed to find username in db"), 500);
  }
  if (userDb.length == 0) {
    return next(new HttpError("Wrong username"), 500);
  }
  try {
    if (await bcrypt.compare(password, userDb[0].password)) {
      res
        .status(201)
        .json({ body: { username: userDb[0].username }, message: "loggedIn" });
    } else {
      return next(new HttpError("Wrong password"), 500);
    }
  } catch (err) {
    const error = new HttpError("Failed to login, check your data!", 500);
    return next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
};
