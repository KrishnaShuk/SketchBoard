import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./consfig.js";
import { middleware } from "./middleware.js";

const app = express();

app.get("/signup", (req, res) => {
   res.send("hello");
})

app.get("/signin", (req, res) => {
   const userId = 1;
   const token = jwt.sign({
      userId
   }, JWT_SECRET)

   res.json({
      token
   })
})

app.get("/room", middleware, (req, res) => {
   res.send("hello");
})

