import { RouterContext } from "../../deps.ts";
import { Bson, Book } from "../config/db.ts";

// @desc            Get all books
// @routes          GET /api/books
const getBooks = async (ctx : RouterContext) => {
    try {
      // Find all books and convert them into an Array.
      const allBooks = await Book.find({}).toArray();

      if (allBooks) {
        ctx.response.status = 200;
        ctx.response.body = {
          success: true,
          data: allBooks,
        };
      } else {
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          message: "Internal Server Error",
        };
      }
    }
    catch (err) {
      ctx.response.body = {
        success: false,
        message: err.toString(),
      };
    }
};

// @desc            Get one book
// @routes          GET /api/book
 const getBook = async (ctx : RouterContext) => {
  const { id } = ctx.params;
  const book = await Book.findOne({
    _id: new Bson.ObjectId(id)
  });

  // If found, respond with the book.
  // If not, respond with a 404
  if (book) {
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: book,
    };
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "No book found",
    };
  }
};

// @desc            Add a book
// @routes          POST /api/book
let createBook =async (ctx : RouterContext) => {
    try {
      if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = {
            success: false,
            message: 'No data'
        }
          
        return;
      }

      let body: any = await ctx.request.body();
      const { title, description, author, link } = await body.value;
      const data = await Book.insertOne({
        title: title,
        description: description,
        author: author,
        link: link,
      });

      console.log(body);
      
      ctx.response.body = {
        status: true,
        data: data
      };
      ctx.response.status = 201;
    }
    catch (err) {
      ctx.response.body = {
        status: false,
        data: null
      };
      ctx.response.status = 500;
      console.log(err);
    }
};

// @desc            Get all book
// @routes          PUT /api/book/:id
const updateBook = async (ctx : RouterContext) => {
  try {
    const body = await ctx.request.body();
    const inputBook = await body.value;
    const { id } = ctx.params;
    const fetchedBook = await Book.findOne({
      _id: new Bson.ObjectId(id)
    });

    if (fetchedBook) {
      const { matchedCount } = await Book.updateOne(
        {
          _id: new Bson.ObjectId(id)
        },
        {
          $set: { ...inputBook }
        }
      );

      if (matchedCount) {
        ctx.response.body = {
          success: true,
          body: `Updated book with id: ${id}`,
        }
        ctx.response.status = 204;
      }
    } else {
      ctx.response.body = {
        success: false,
        body: `No book with id: ${id} found`,
      }
      ctx.response.status = 404;
    }
  } catch (error) {
    ctx.response.body = {
      success: false,
      body: error.message,
    }
    ctx.response.status = 500;
  }
};

// @desc            Delete a book
// @routes          DELETE /api/book/:id
const deleteBook = async (ctx: RouterContext) => {
  try {
    const { id } = ctx.params;

    await Book.deleteOne({
      _id: new Bson.ObjectId(id)
    });

    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      message: "Book deleted",
    };
  } catch (err) {
    ctx.response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

export { getBooks, getBook, createBook, updateBook, deleteBook };