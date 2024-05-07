import express from "express";

import { env } from "./config/index.js";
import mongoose from "mongoose";
import filmRouter from "./router/film.router.js";
import userRouter from "./router/user.router.js";

import cors from "cors";



// APP EXPRESS

const app = express();


//port

const port = env.PORT || 1312;


//DB

mongoose.connect(env.MONGO_URI, {dbName: "movies"}).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
});

//middleware
app.use(express.json());
//use cors 

app.use(cors())

//prefix routes
app.use("/api/films", filmRouter);
app.use("/api/users", userRouter);



//server


app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});


