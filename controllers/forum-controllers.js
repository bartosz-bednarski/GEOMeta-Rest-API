const HttpError = require("../models/http-error");
require("dotenv").config();
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
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
// let date = new Date();
// let day = new String(date.getDate());
// day = day.length === 1 ? `0${day}` : day;
// let hours = new String(date.getHours());
// hours = hours.length === 1 ? `0${hours}` : hours;
// let minutes = new String(date.getMinutes());
// minutes = minutes.length === 1 ? `0${minutes}` : minutes;
// let dateExpo = day + " " + month[date.getMonth()] + " " + date.getFullYear();
// let timeExpo = hours + ":" + minutes;
const createTopic = async (req, res, next) => {
  let date = new Date();
  let day = new String(date.getDate());
  day = day.length === 1 ? `0${day}` : day;
  let hours = new String(date.getHours());
  hours = hours.length === 1 ? `0${hours}` : hours;
  let minutes = new String(date.getMinutes());
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  let dateExpo = day + " " + month[date.getMonth()] + " " + date.getFullYear();
  let timeExpo = hours + ":" + minutes;
  const data = [
    {
      topic_id: uuidv1(),
      username: req.user.username,
      usernameShort: req.body.usernameShort,
      topic: req.body.topic,
      dateString: dateExpo,
      timeString: timeExpo,
      date: new Date(),
      comments: [],
      latestUpdate: dateExpo,
      iconBackgroundColor: req.body.iconBackgroundColor,
    },
  ];
  try {
    const client = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("Geometa");
    const forumCollection = db.collection("Topics");
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
    const forumCollection = db.collection("Topics");
    const response = await forumCollection.find({}).toArray();

    res.status(201).json({ message: "Success", data: response });
    client.close();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const createComment = async (req, res, next) => {
  let date = new Date();
  let day = new String(date.getDate());
  day = day.length === 1 ? `0${day}` : day;
  let hours = new String(date.getHours());
  hours = hours.length === 1 ? `0${hours}` : hours;
  let minutes = new String(date.getMinutes());
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  let dateExpo = day + " " + month[date.getMonth()] + " " + date.getFullYear();
  let timeExpo = hours + ":" + minutes;
  let data;
  if (req.user === undefined) {
    data = [
      {
        comment_id: uuidv1(),
        topic_id: req.body.topic_id,
        username: "Anonymous",
        usernameShort: "anonymous",
        dateString: dateExpo,
        timeString: timeExpo,
        iconBackgroundColor: "#2baad7",
        content: req.body.content,
        date: new Date(),
      },
    ];
  }
  if (req.user !== undefined) {
    data = [
      {
        comment_id: uuidv1(),
        topic_id: req.body.topic_id,
        username: req.user.username,
        usernameShort: req.body.usernameShort,
        dateString: dateExpo,
        timeString: timeExpo,
        iconBackgroundColor: req.body.iconBackgroundColor,
        content: req.body.content,
        date: new Date(),
      },
    ];
  }

  try {
    const client = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("Geometa");
    const forumCollection = db.collection("Comments");
    const response = await forumCollection.insertMany(data);
    client.close();
    const client2 = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const topicsCollection = client2.db("Geometa").collection("Topics");
    console.log("data", data[0].usernameShort);
    const update = await topicsCollection.findOneAndUpdate(
      {
        topic_id: req.body.topic_id,
      },

      {
        $push: {
          comments: {
            iconBackgroundColor: data[0].iconBackgroundColor,
            usernameShort: data[0].usernameShort,
            date: data[0].dateString,
            time: data[0].timeString,
          },
        },
      },
      { new: true }
    );
    client2.close();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
const getComments = async (req, res, next) => {
  const topicId = req.params.topicId;
  try {
    const client = await mongo.MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kl5um6i.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db("Geometa");
    const forumCollection = db.collection("Comments");
    const response = await forumCollection
      .find({ topic_id: topicId })
      .toArray();
    res.status(201).json({ message: "Success", data: response });
    client.close();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to connect with db!"), 500);
  }
};
module.exports = { createTopic, getTopics, createComment, getComments };
