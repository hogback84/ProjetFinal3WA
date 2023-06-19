import React from "react";
import { Link } from "react-router-dom";
import useBooks from "../context/useBooks.js";
import "../assets/styles/pages/_wishlist.scss";

const Wishlist = () => {
  const { wishlistBooks, removeFromWishlist } = useBooks();

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await removeFromWishlist(bookId);
    } catch (error) {
      console.error("Failed to remove book from wishlist", error);
    }
  };

  return (
    <div className="container my-5 p-3 rounded cart">
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="product-details mb-3">
            <h1>
              Saved <b>items</b>
            </h1>
            {wishlistBooks.length === 0 ? (
              <div className="conatiner text-center mt-5 mx-5">
                <h4>You haven’t saved an item yet!</h4>
                <p className="mt-5 mr-5 h6 text-muted">
                  Found something you like? Tap on the heart shaped icon next to
                  the item to add it to your wishlist! All your saved items will
                  appear here.
                </p>
                <Link to={"/"}>
                  <button className="btn btn-dark rounded-3 mt-5">
                    Continue shopping
                  </button>
                </Link>
              </div>
            ) : (
              wishlistBooks.map((book) => (
                <div
                  className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded"
                  key={book.book_id}
                >
                  <div className="d-flex flex-row">
                    <img
                      className="rounded"
                      src={book.image_url}
                      width={60}
                      alt={book.title}
                    />
                    <div className="ml-2 p-3">
                      <span className="font-weight-bold d-block mb-3 bookname">
                        {book.title}
                      </span>
                      <p>{book.author}</p>
                      <p>{book.description}</p>
                      <p>{book.price}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <button
                      className="btn btn-link p-0"
                      onClick={() => handleRemoveFromWishlist(book.book_id)} // Pass book.id instead of book
                    >
                      <span className="sr-only">
                        Remove {book.title} from wishlist
                      </span>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
