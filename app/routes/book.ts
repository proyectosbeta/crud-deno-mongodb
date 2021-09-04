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
  .get("/api/book", getBooks)
  .get("/api/book/:id", getBook)
  .post("/api/book", createBook)
  .put("/api/book/:id", updateBook)
  .delete("/api/book/:id", deleteBook);

export { router };