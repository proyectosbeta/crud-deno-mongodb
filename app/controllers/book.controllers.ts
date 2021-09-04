import { Book } from "../config/db.ts";

/**
 * DESC: GET all books
 * METHOD GET /api/book
 */
const getBooks = async ({ response }: { response: any }) => {
    try {
      // Find all books and convert them into an Array.
      const allBooks = await Book.find({}).toArray();

      if (allBooks) {
        response.status = 200;
        response.body = {
          success: true,
          data: allBooks,
        };
      } else {
        response.status = 500;
        response.body = {
          success: false,
          msg: "Internal Server Error",
        };
      }
    }
    catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
};

/**
 * DESC: GET single book
 * METHOD: GET /api/book/:id
 */
 const getBook = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  // Searches for a particular book in the DB.
  const book = await Book.findOne({
    _id: params.id
  });

  // If found, respond with the book.
  // If not, respond with a 404
  if (book) {
    response.status = 200;
    response.body = {
      success: true,
      data: book,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No book found",
    };
  }
};

/**
 * DESC: ADD single book
 * METHOD: POST /api/book
 */
let createBook = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
    try {
      let body: any = await request.body();
      const { title, description, author, link } = await body.value;
      const data = await Book.insertOne({
        title: title,
        description: description,
        author: author,
        link: link,
      });

      console.log(body);
      
      response.body = {
        status: true,
        data: data
      };
      response.status = 201;
    }
    catch (err) {
      response.body = {
        status: false,
        data: null
      };
      response.status = 500;
      console.log(err);
    }
};

// /**
//  * Updates an existing book.
//  */
// const updateBook = async ({
//   params,
//   request,
//   response,
// }: {
//   params: { id: string };
//   request: any;
//   response: any;
// }) => {
//   const book = books.filter((book) => book.id == params.id[0]);
//   if (book) {
//     const body = await request.body();
//     // book.title = body.value.title;
//     // book.description = body.value.description;
//     // book.author = body.value.author;

//     console.log(body.value);

//     response.status = 200;
//     response.body = {
//       success: true,
//       data: book,
//     };
//   } else {
//     response.status = 404;
//     response.body = {
//       success: false,
//       message: "Book not found",
//     };
//   }
// };

// /**
//  * Delete a book by a given id
//  */
// const deleteBook = ({
//   params,
//   response,
// }: {
//   params: { id: string };
//   response: any;
// }) => {
//   books = books.filter((book) => book.id !== params.id);
//   response.status = 200;
//   response.body = {
//     success: true,
//     message: "Book removed",
//   };
// };

export { getBooks, getBook, createBook };

// export { getBooks, getBook, createBook, updateBook, deleteBook };