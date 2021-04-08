import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getBook, saveBook } from "../services/bookService";

class BookForm extends Form {
  state = {
    data: {
      id: "",
      title: "",
      author: "",
      description: "",
      genre_id: "",
      numberInStock: "",
      image: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    id: Joi.number(),
    title: Joi.string().required().label("Title"),
    author: Joi.string().required().label("Author"),
    genre_id: Joi.string().required().label("Genre"),
    description: Joi.string().required().label("Description"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    image: Joi.string().label("Image"),
    // Joi.any()
    //   .meta({ swaggerType: "file" })
    //   .optional()
    //   .description("Image File"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === "new") return;
      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }

  mapToViewModel(book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      genre_id: book.genre_id,
      description: book.description,
      numberInStock: book.numberInStock,
      image: book.image,
    };
  }
  doSubmit = async () => {
    console.log("Submit clicked- " + this.state.data);
    await saveBook(this.state.data);
    this.props.history.push("/books");
  };

  render() {
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("author", "Author")}
          {this.renderTextArea("description", "Description")}
          {this.renderSelect("genre_id", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderImage("image", "Image")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
