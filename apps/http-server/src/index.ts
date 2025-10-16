import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prismaClient = new PrismaClient();

app.get("/signup", async (req, res) => {
   const parsedData = CreateUserSchema.safeParse(req.body);
   if (!parsedData.success) {
      return res.json({
         message: "Incorrect inputs"
      })
      return;
   }

   try {
      const user = await prismaClient.user.create({
      data: {
         email: parsedData.data?.username,
         password: parsedData.data.password,
         name: parsedData.data.name,
      }
   })

   res.json({
      userId: user.id
   })
   } catch(e) {
      res.status(411).json({
         message:"USer already exists"
      })
   }
})

app.get("/signin", async (req, res) => {

   const parsedData = SigninSchema.safeParse(req.body);
   if (!parsedData.success) {
      return res.json({
         message: "Incorrect inputs"
      })
      return;
   }

   const user = await prismaClient.user.findFirst({
      where:{
         email: parsedData.data.username,
         password: parsedData.data.password
      }
   })

   if(!user){
      res.status(403). json({
         "message": "User doesn't exist"
      })
      return;
   }

   const userId = user?.id ;
   const token = jwt.sign({
      userId
   }, JWT_SECRET)

   res.json({
      token
   })
})

app.get("/room", middleware, async (req, res) => {
   const parsedData = CreateRoomSchema.safeParse(req.body);
   if(!parsedData.success){
      res.json({
         message: "Incorrect credentials",
      })
      return;
   }

   const userId = req.userId;

   try {
      if (typeof userId !== "string") {
      res.status(400).json({
         message: "Invalid userId"
      });
      return;
   }

   const room = await prismaClient.room.create({ 
      data: {
         slug: parsedData.data.name,
         adminId: userId
      }
   });

   res.json({
      roomId: room.id
   })
      
   } catch(e){
      res.status(411).json({
         message: "Room already exists"
      })
   }
})

app.get("/chats/:roomId", async (req,res) => {
 try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
         slug
      }
   }) 

   res.json({
      room
   })
})

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});