import express from "express";

const app = express();

app.get("/signin", (req, res) => {
   res.send("hello");
})

app.get("/signup", (req, res) => {
   res.send("hello");
})

app.get("/chat", (req, res) => {
   res.send("hello");
})

