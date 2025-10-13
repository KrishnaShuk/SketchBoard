import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { CreateUserSchema } from "@repo/common/types"

const app = express();

app.get("/signup", (req, res) => {
   const data = CreateUserSchema.safeParse(req.body);
   if (!data.success) {
      return res.json({
         message: "Incorrect inputs"
      })
   }

   res.json({
      userId: "123"
   })
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

