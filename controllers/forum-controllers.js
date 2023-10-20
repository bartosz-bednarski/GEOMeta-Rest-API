const HttpError = require("../models/http-error");
require("dotenv").config();
const mongo = require("mongodb");
var month = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];
const date = new Date();
let day = new String(date.getDate());
day = day.length === 1 ? `0${day}` : day;
let hours = new String(date.getHours());
hours = hours.length === 1 ? `0${hours}` : hours;
const dateExpo = day + " " + month[date.getMonth()] + " " + date.getFullYear();
const timeExpo = hours + ":" + date.getMinutes();
const createTopic = async (req, res, next) => {
  const data = [
    {
      username: req.user.username,
      usernameShort: req.body.usernameShort,
      topic: req.body.topic,
      dateString: dateExpo,
      timeString: timeExpo,
      date: new Date(),
    },
  ];
  try {
    const client = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("Geometa");
    const forumCollection = db.collection("Forum");
    const response = await forumCollection.insertMany(data);
    client.close();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const getTopics = async (req, res, next) => {
  try {
    const client = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("Geometa");
    const forumCollection = db.collection("Forum");
    const response = await forumCollection.find({}).toArray();
    res.status(201).json({ message: "Success", data: response });
    client.close();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};

module.exports = { createTopic, getTopics };
