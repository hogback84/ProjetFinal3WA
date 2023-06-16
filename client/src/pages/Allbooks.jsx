import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BookContext from "../context/BookContext.js";
import { usePagination } from "../utils/Pagination.js";
import "../assets/styles/pages/_allbooks.scss";
import { useFetchBooks } from "../utils/useFetchBooks.js";

const AllBooks = () => {
  const { handleReset } = useContext(BookContext);
  const books = useFetchBooks();

  const [searchTitle, setSearchTitle] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().startsWith(searchTitle.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, searchTitle]);

  const handleSearchInputChange = (event) => {
    setSearchTitle(event.target.value);
  };
  const { currentPage, totalPages, getCurrentPageItems, handlePageChange } =
    usePagination(filteredBooks, 12);

  return (
    <div className="all-books">
      <div className=" most-books module-small mt-5">
        <div className="container">
          <form className="row mx-auto">
            <div className="col-sm-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Books"
                onChange={handleSearchInputChange}
                value={searchTitle}
              />
            </div>
            <div className="col-sm-4 mb-3">
              <button
                className="btn btn-danger btn-round btn-g"
                type="submit"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <section className="module-large mx-auto">
        <div className="container">
          <div className="row mx-auto">
            <div className="allItems">
              {getCurrentPageItems().map((book) => (
                <div className="shop-items" key={book.id}>
                  <div className="shop-item-image">
                    <Link to={`./bookdetails/${book.id}`}>
                      <img
                        src={book.image_url ? book.image_url : book.id}
                        alt={book.title}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="shop-item-detail">
                    <div className="d-flex justify-content-between mx-2 mt-1">
                      <h5 className="shop-item-title">{book.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBooks;
