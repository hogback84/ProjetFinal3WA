import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBooks from "../context/useBooks.js";
import "../assets/styles/pages/_bookdetails.scss";

const BookDetails = () => {
  const { books, addToCart, handleWishlist } = useBooks();
  const [book, setBook] = useState(null); // local state to store the book data
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const book = books.find((book) => book.id === parseInt(id, 10));
      if (book) {
        setBook(book);
        setIsWishlisted(book.wishlist);
      }
    };

    fetchBook();
  }, [id, books]);

  const handleWishlistToggle = () => {
    handleWishlist(book);
    setIsWishlisted(!isWishlisted);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <section className="bookdetails">
        <div className="container-fluid px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-4">
              <div className="col-md-4">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="book-image"
                />
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{book.title}</h1>
              <div className="fs-5 mb-5">
                <span className="text">{`Price : ${book.price}$`}</span>
                <span className="m-5" style={{ color: "green" }}>
                  Sale : 25%
                </span>
              </div>
              <p className="lead" style={{ color: "black" }}>
                {book.description}
              </p>
              <div className="d-flex ">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(book)}
                  disabled={book.isInCart}
                >
                  {book.isInCart ? "Added to cart" : "Add to cart"}
                </button>

                <button
                  className="btn btn-outline-dark flex-shrink-1 mx-2"
                  onClick={() => handleWishlistToggle(book)}
                  type="button"
                >
                  {isWishlisted ? (
                    <>
                      Remove from wishlist <i className="fas fa-heart"></i>
                    </>
                  ) : (
                    <>
                      Add to wishlist <i className="far fa-heart"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default BookDetails;
