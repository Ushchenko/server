import express from "express"
import mongoose from "mongoose";
import cors from "cors"

import { registerValidation, loginValidation } from "./validations/auth.js";
import { bookValidation } from "./validations/book.js"

import handleValidationErrors from "./utils/handleValidationErrors.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as BookController from "./controllers/BookController.js"


mongoose
  .connect('mongodb+srv://admin:admin@cluster0.1cwhv02.mongodb.net/api-server-practice')
  .then(() => console.log("DataBase Started"))
  .catch((err) => console.log(err));


const app = express();


app.use(express.json());
app.use(cors())


app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)

app.get("/book/getAll", BookController.getAll)
app.get("/book/:id", BookController.getOne)
app.post("/book/add", checkAuth, bookValidation, BookController.add)
app.delete("/book/:id", checkAuth, BookController.remove)
app.patch("/book/:id", checkAuth, bookValidation, BookController.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started")
})
