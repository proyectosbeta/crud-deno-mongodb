import { Bson, MongoClient } from "https://deno.land/x/mongo/mod.ts";
import { BookSchema } from "../types/BookSchema.ts";

const URI = "mongodb://127.0.0.1:27017";
const client = new MongoClient();
const dataBaseName: string = "books";

try {
    await client.connect(URI);
    console.log("Database successfully connected");
} catch (err) {
    console.log(err);
}

const dataBase = client.database(dataBaseName);
const Book = dataBase.collection<BookSchema>("book");

export { Bson, Book };