import * as generesAPI from "./fakeGenreService";

const books = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Operating System Concepts",
    author: "Galvin",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Technology" },
    description: "Operating System Concepts",
    numberInStock: 6,
    liked: true,
    image: "../images/galvin.jpeg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Introduction to Algorithms",
    author: "Cormen",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Technology" },
    description: "Introduction to Algorithms",
    numberInStock: 5,
    image: "./images/cormen.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Da Vinci Code",
    author: "Dan Brown",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Fiction" },
    description: "Da Vinci Code",
    numberInStock: 8,
    image: "./images/davincicode.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Non-Fiction" },
    description: "Thinking Fast and Slow",
    numberInStock: 7,
    image: "./images/daniel.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Non-Fiction" },
    description: "Sapiens",
    numberInStock: 7,
    image: "./images/sapiens.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "The Power of Habit",
    author: "Charles Duhig",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Non-Fiction" },
    description: "The Power of Habit",
    numberInStock: 7,
    image: "./images/powerofhabit.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Angels and Demons",
    author: "Dan Brown",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Fiction" },
    description: "Angels and Demons",
    numberInStock: 7,
    image: "./images/angelsdemons.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Deception Point",
    author: "Dan Brown",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Fiction" },
    description: "Deception Point",
    numberInStock: 4,
    image: "./images/deceptionpoint.jpg",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Cracking The Coding Interview",
    author: "Gayle Laakmann McDowell",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Technology" },
    description: "Cracking The Coding Interview",
    numberInStock: 7,
    image: "./images/crackingthecodinginterview.jpg",
  },
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find((b) => b._id === id);
}

export function saveBook(book) {
  let bookInDb = books.find((b) => b._id === book._id) || {};
  bookInDb.title = book.title;
  bookInDb.author = book.author;
  bookInDb.genre = generesAPI.genres.find((g) => g._id === book.genreId);
  bookInDb.description = book.description;
  bookInDb.numberInStock = book.numberInStock;
  bookInDb.image = book.image;

  if (!bookInDb._id) {
    bookInDb._id = Date.now().toString;
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deletebook(id) {
  let bookInDb = books.find((m) => m._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
