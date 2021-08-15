import { Book } from "../types/book.ts";

const data = JSON.parse(Deno.readTextFileSync("./data/books.json"));

/**
 * Sample array with books
 */
let books: Array<Book> = data;

/**
 * Returns all the books
 */
const getBooks = ({ response }: { response: any }) => {
  response.body = books;
};

/**
 * Returns a book by id
 */
const getBook = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const book = books.filter((book) => book.id == params.id)[0];
  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
    response.body = { message: "4040 Not found" };
  }
};

/**
 * Creates a new books
 */
const createBook = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const book: Book = body.value;
  books.push(book);
  response.body = { sucess: true, data: books };
  response.tatus = 201;
};

/**
 * Updates an existing book.
 */
const updateBook = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const book = books.filter((book) => book.id == params.id[0]);
  if (book) {
    const body = await request.body();
    // book.title = body.value.title;
    // book.description = body.value.description;
    // book.author = body.value.author;

    console.log(body.value);

    response.status = 200;
    response.body = {
      success: true,
      data: book,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Book not found",
    };
  }
};

/**
 * Delete a book by a given id
 */
const deleteBook = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  books = books.filter((book) => book.id !== params.id);
  response.status = 200;
  response.body = {
    success: true,
    message: "Book removed",
  };
};

export { getBooks, getBook, createBook, updateBook, deleteBook };