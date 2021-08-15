import { Router } from "../../deps.ts";
import {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/book.controllers.ts";

const router = new Router();

router
  .get("/book", getBooks)
  .get("/book/:id", getBook)
  .post("/book", createBook)
  .put("/book/:id", updateBook)
  .delete("/book/:id", deleteBook);

export { router };