import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class BooksTable extends Component {
  columns = [
    {
      key: "image",
      content: (book) => (
        <img
          style={{ width: 100, height: 150 }}
          src={"http://localhost:8000/" + book.image}
          alt="na"
        ></img>
      ),
    },
    {
      path: "title",
      label: "Title",
      content: (book) => <Link to={`/books/${book.id}`}>{book.title}</Link>,
    },
    { path: "author", label: "Author" },
    { path: "numberInStock", label: "Stock" },
    // { path: "genreId", label: "Genre" },
    {
      key: "like",
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
    {
      key: "delete",
      content: (book) => (
        <button
          onClick={() => this.props.onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { books, sortColumn, onSort, genres } = this.props;
    console.log(books);
    return (
      <Table
        columns={this.columns}
        data={books}
        genres={genres}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;
