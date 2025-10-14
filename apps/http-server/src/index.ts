import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { CreateRoomSchema, CreateUserSchema } from "@repo/common/types";
import { PrismaClient } from "@prisma/client";



const app = express();

const prismaClient = new PrismaClient();

app.get("/signup", (req, res) => {
   const parsedData = CreateUserSchema.safeParse(req.body);
   if (!parsedData.success) {
      return res.json({
         message: "Incorrect inputs"
      })
      return;
   }

   try {
      await prismaClient.user.create({
      data: {
         email: parsedData.data?.username,
         password: parsedData.data.password,
         name: parsedData.data.name,
      }
   })

   res.json({
      userId: "123"
   })
   } catch(e) {
      res.status(411).json({
         message:"USer already exists"
      })
   }
})

app.get("/signin", (req, res) => {

   const userId = prismaClient.user.


   const token = jwt.sign({
      userId
   }, JWT_SECRET)

   res.json({
      token
   })
})

app.get("/room", middleware, (req, res) => {
   const data = CreateRoomSchema.safeParse(req.body);
   if(!data.success){
      res.json({
         message: "Incorrect credentials",
      })
      return;
   }

   res.json({
      roomId: 123
   })

})


app.listen(3001);
