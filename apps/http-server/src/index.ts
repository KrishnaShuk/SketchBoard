import express from "express";

const app = express();

app.get("/signup", (req, res) => {
   res.send("hello");
})

app.get("/signin", (req, res) => {
   res.send("hello");
})

app.get("/create-room", (req, res) => {
   res.send("hello");
})

