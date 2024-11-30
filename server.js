import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import Videos from "./dbModal.js";

// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json()); // Parse incoming JSON payloads

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
// DB config
const connectionUrl =
  "mongodb+srv://hiteshnathani7777:hiteshTiktok@cluster0.ioa4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api endpoints
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.get("/v1/posts", (req, res) => res.status(200).send(data));

// Post request to add data to the database
app.post("/v2/posts", async (req, res) => {
  try {
    console.log("Incoming Request Body: ", req.body); // Log the request body for debugging
    const dbVideos = req.body;

    const video = await Videos.create(dbVideos); // Create a new document in the database
    res.status(201).send(video);
  } catch (err) {
    console.error("Error: ", err); // Log the error for debugging
    res.status(500).send(err.message);
  }
});

app.get("/v2/posts", async (req, res) => {
  try {
    const videos = await Videos.find({});
    res.status(200).send(videos);
  } catch (err) {
    console.error("Error: ", err); // Log the error for debugging
    res.status(500).send(err.message);
  }
});

// app listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
