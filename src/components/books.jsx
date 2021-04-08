import React, { Component } from "react";
import Pagination from "./common/pagination";
import BooksTable from "./booksTable";
import ListGroup from "./common/listGroup";
import { toast, Slide } from "react-toastify";
import { paginate } from "../utils/paginate";
import { getBooks, deleteBook } from "../services/bookService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
// import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
// import Switch from "./common/switch";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    // isToggled: false,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ id: "", name: "All Genres" }, ...data];
    // console.log(genres);

    const { data: books } = await getBooks();
    this.setState({ books, genres });
  }

  handleDelete = async (book) => {
    const originalBooks = this.state.books;
    const books = originalBooks.filter((b) => b.id !== book.id);
    this.setState({ books });
    try {
      await deleteBook(book.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something went wrong, book could not get deleted.", {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
          autoClose: 2000,
        });
      this.setState({ books: originalBooks });
    }
  };

  handleLike = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, selectedGenre: null });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // handleToggle = () => {
  //   let Toggle = this.state.isToggled;
  //   if (Toggle) this.setState({ isToggled: false });
  //   else this.setState({ isToggled: true });
  // };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      // isToggled,
      books: allBooks,
    } = this.state;
    let filtered = allBooks;
    let searchedBooks = [];
    if (searchQuery) {
      // if (isToggled) {
      //   filtered = allBooks.filter((b) =>
      //     b.author.toLowerCase().startsWith(searchQuery.toLowerCase())
      //   );
      // } else {
      //   filtered = allBooks.filter((b) =>
      //     b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      //   );
      // }
      for (let book of allBooks) {
        // console.log(book["title"]);
        if (book.title.toLowerCase().startsWith(searchQuery.toLowerCase())) {
          if (!searchedBooks.some((b) => b === book)) searchedBooks.push(book);
          // console.log(book);
        }

        if (book.author.toLowerCase().startsWith(searchQuery.toLowerCase())) {
          // console.log(book);
          if (!searchedBooks.some((b) => b === book)) searchedBooks.push(book);
        }
      }
      filtered = searchedBooks;
    } else if (selectedGenre && selectedGenre.id) {
      console.log(selectedGenre);
      filtered = allBooks.filter((b) => b.genre_id === selectedGenre.id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: books };
  };

  render() {
    // const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn } = this.state;

    // if (count === 0) return <p>There are no books in the database</p>;
    const { totalCount, data: books } = this.getPagedData();
    const { user } = this.props;
    return (
      <div className="row">
        {/* <Link
          to="/books/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Book
        </Link> */}

        <div className="col-3">
          <SearchBox value={this.searchQuery} onChange={this.handleSearch} />

          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {/* <p>Showing {totalCount} books from the database.</p> */}
          {/* <Switch isToggled={isToggled} onToggle={this.handleToggle} /> */}
          <BooksTable
            books={books}
            genres={this.state.genres}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Books;
