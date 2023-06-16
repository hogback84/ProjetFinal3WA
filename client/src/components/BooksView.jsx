import "../assets/styles/components/_booksview.scss";
import { Link } from "react-router-dom";
import React from "react";
import { useFetchBooks } from "../utils/useFetchBooks.js";

const BooksView = () => {
  const books = useFetchBooks();

  return (
    <section className="most-books">
      <div className="container" id="Scicence">
        <div className="row">
          <div className="col-md-12">
            <h2>
              Most<b> Bought Books</b>
            </h2>
          </div>
          <div className="books">
            {books.slice(0, 10).map((book) => (
              <div className="book" key={book.id}>
                <img
                  src={book.image_url ? book.image_url : book.id}
                  alt={book.title}
                  loading="lazy"
                />

                <div className="thumb-content">
                  <h5>{book.title}</h5>
                  <p className="item-price">
                    <span style={{ textDecoration: "line-through" }}>
                      {book.price}
                    </span>{" "}
                    <span>25%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link
          to={"/allbooks"}
          className="btn btn-dark rounded-pill seemore-Btn"
        >
          More Books
          <span>
            <i className="fas fa-arrow-right"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default BooksView;
