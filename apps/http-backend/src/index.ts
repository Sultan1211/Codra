import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "Hi There!",
  });
});

app.listen(3002)
