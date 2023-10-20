const HttpError = require("../models/http-error");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res, next) => {
  const { username, email, password, iconBackgroundColor } = req.body;
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
        `INSERT INTO "users" ("username","email","password","icon_background_color","username_short") VALUES ('${username}','${email}','${hashedPassword}','${iconBackgroundColor}','${username
          .slice(0, 2)
          .toUpperCase()}')`
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
      `select username,password,email,icon_background_color,username_short from users where(username='${username}')`
    );
    console.log(userDb);
  } catch (err) {
    return next(new HttpError("Failed to find username in db"), 500);
  }
  if (userDb.length == 0) {
    return next(new HttpError("Wrong username"), 500);
  }
  try {
    if (await bcrypt.compare(password, userDb[0].password)) {
      const user = { username: userDb[0].username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(201).json({
        body: {
          username: userDb[0].username,
          usernameShort: userDb[0].username_short,
          email: userDb[0].email,
          iconBackgroundColor: userDb[0].icon_background_color,
          accessToken: accessToken,
        },
        message: "loggedIn",
      });
    } else {
      return next(new HttpError("Wrong password"), 500);
    }
  } catch (err) {
    const error = new HttpError("Failed to login, check your data!", 500);
    return next(error);
  }
};

const checkUserAuth = async (req, res, next) => {
  try {
    userDb = await db.query(
      `select username,password,email from users where(username='${req.user.username}')`
    );
  } catch (err) {
    const error = new HttpError("Failed to login, check your data!", 500);
    return next(error);
  }
  if (req.body.username === userDb[0].username) {
    res.status(201).json({ username: "Correct" });
  }
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return next(new HttpError("Check your access token!"), 401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(new HttpError("Invalid token!"), 403);
    req.user = user;
    next();
  });
};
module.exports = {
  registerUser,
  loginUser,
  checkUserAuth,
  authenticateToken,
};
