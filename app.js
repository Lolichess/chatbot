const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

app.use(express.static("public"));

/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});*/

/*app.use(bodyParser.urlencoded({ extended: true }));*/

app.use(bodyParser.json());

/*
app.use(bodyParser.urlencoded({ extended: false }));*/

var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/test.html"));
});

app.post("/", async (req, res) => {
  const result = await getValue(req.body.prompt);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

getValue = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:", " END", "Benito Pérez Galdós:"],
  });

  return response.data.choices;
};
