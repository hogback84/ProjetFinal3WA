import { useState, useEffect } from "react";
import apiClient from "../services/apiClient.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/books");
        const data = response.data;

        // Fetch the user's wishlist
        const wishlistResponse = await apiClient.get("/wishlist");
        const wishlistData = wishlistResponse.data;

        // Create a Set of book IDs in the wishlist
        const wishlistBookIds = new Set(
          wishlistData.map((book) => book.book_id)
        );

        // Update the `wishlist` property of the books based on the wishlist data
        const updatedBooks = data.map((book) => {
          return {
            ...book,
            wishlist: wishlistBookIds.has(book.id),
            isInCart: false,
            count: 0,
          };
        });

        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiClient.get("/wishlist");
        const data = response.data;

        setWishlistBooks(data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleAdd = async (newBook) => {
    try {
      const response = await apiClient.post("/books", newBook);
      const addedBook = response.data;
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setFilteredBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("Failed to add book", error);
      // You can also set an error state here and display it in the AddNewItem component
    }
  };

  const filterBooks = (books, searchTitle, selectedPrice) => {
    const filteredBooks = books.filter((book) => {
      const titleMatches = searchTitle
        ? book.title.toLowerCase().startsWith(searchTitle.toLowerCase())
        : true;

      const priceMatches = selectedPrice
        ? book.price >= selectedPrice - 5 && book.price <= selectedPrice
        : true;

      const isMatch = titleMatches && priceMatches;
      return isMatch;
    });

    return searchTitle ? filteredBooks : books;
  };

  const handleWishlist = async (book) => {
    try {
      if (book.wishlist) {
        // Remove the book from the wishlist
        await removeFromWishlist(book.id);
        // Update the wishlistBooks state
        setWishlistBooks((prevState) =>
          prevState.filter((wishlistBook) => wishlistBook.book_id !== book.id)
        );
      } else {
        // Add the book to the wishlist
        await addToWishlist(book);
        // Update the wishlistBooks state
        const newWishlistBook = {
          book_id: book.book_id,
          title: book.title,
          author: book.author,
          image_url: book.image_url,
        };
        setWishlistBooks((prevState) => [...prevState, newWishlistBook]);
      }

      // Update the wishlist status of the book in the local state
      const updatedBooks = books.map((b) => {
        if (b.id === book.id) {
          return { ...b, wishlist: !b.wishlist };
        }
        return b;
      });

      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    } catch (error) {
      console.error("Failed to update book wishlist status", error);
    }
  };

  const handleUpdateBooks = async (bookId, updatedBook) => {
    try {
      await apiClient.put(`/books/${bookId}`, updatedBook);
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...updatedBook };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const addToWishlist = async (book) => {
    try {
      await apiClient.post("/wishlist", { bookId: book.id });
    } catch (error) {
      console.error("Failed to add book to wishlist", error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      await apiClient.delete("/wishlist/" + bookId);
      setWishlistBooks((prevState) =>
        prevState.filter((book) => book.book_id !== bookId)
      );
    } catch (error) {
      console.error("Failed to remove book from wishlist", error);
    }
  };

  //  useEffect to fetch the cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiClient.get("/shoppingcart");
        const data = response.data;

        setCartBooks(data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (book) => {
    try {
      await apiClient.delete(`/books/${book.id}`);
      const newBooks = books.filter((p) => book.id !== p.id);
      setBooks(newBooks);
      setFilteredBooks(newBooks);
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  // function to remove a book from the cart
  const removeFromCart = async (bookId) => {
    try {
      await apiClient.delete(`/shoppingcart/${bookId}`);
      setCartBooks((prevState) =>
        prevState.filter((book) => book.book_id !== bookId)
      );

      // Update books state to reflect that the book is not in the cart anymore
      setBooks((prevState) =>
        prevState.map((book) =>
          book.id === bookId ? { ...book, isInCart: false } : book
        )
      );
    } catch (error) {
      console.error("Failed to delete book from cart", error);
    }
  };

  const addToCart = async (book) => {
    try {
      await apiClient.post("/shoppingcart", {
        bookId: book.id,
        quantity: 1,
        price: book.price,
        totalPrice: book.price,
        image_url: book.image_url,
      });
      book.isInCart = true;
      book.count = 1;
      setCartBooks([...cartBooks, book]);
      localStorage.setItem("cartBooks", JSON.stringify([...cartBooks, book]));
    } catch (error) {
      console.error("Failed to add book to cart", error);
    }
  };

  const handleDecrement = async (book) => {
    if (book.count > 1) {
      try {
        const response = await apiClient.put(`/shoppingcart/${book.book_id}`, {
          quantity: book.count - 1,
          price: book.price,
          totalPrice: (book.count - 1) * book.price,
        });
        if (response.status === 200) {
          setCartBooks((prevCartBooks) =>
            prevCartBooks.map((b) =>
              b.book_id === book.book_id ? { ...b, count: b.count - 1 } : b
            )
          );
          fetchCartBooks(); // Add this line
        }
      } catch (error) {
        console.error("Failed to decrement book quantity", error);
      }
    }
  };

  const handleIncrement = async (book) => {
    try {
      const response = await apiClient.put(`/shoppingcart/${book.book_id}`, {
        quantity: book.count + 1,
        price: book.price,
        totalPrice: (book.count + 1) * book.price,
      });
      if (response.status === 200) {
        setCartBooks((prevCartBooks) =>
          prevCartBooks.map((b) =>
            b.book_id === book.book_id ? { ...b, count: b.count + 1 } : b
          )
        );
        fetchCartBooks();
      }
    } catch (error) {
      console.error("Failed to increment book quantity", error);
    }
  };

  const fetchCartBooks = async () => {
    try {
      const cartBooks = await getCartBooks();
      setCartBooks(cartBooks);
    } catch (error) {
      console.error("Failed to fetch updated cart books", error);
    }
  };

  const updateCartQuantity = async (bookId, quantity, price) => {
    try {
      await apiClient.put(`/shoppingcart/${bookId}`, {
        quantity: quantity,
        price: price,
        totalPrice: quantity * price,
      });

      // Find the book in the books array and update its count
      const updatedBooks = books.map((book) => {
        if (book.book_id === bookId) {
          return { ...book, count: quantity };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Failed to update cart quantity", error);
    }
  };

  const getCartBooks = async () => {
    try {
      const response = await apiClient.get("/shoppingcart");
      const cartBooksData = response.data;
      const cartBooks = cartBooksData.map((book) => ({
        ...book,
        book_id: book.book_id, // Make sure the book_id is assigned correctly
        count: book.quantity,
        isInCart: true,
      }));
      return cartBooks;
    } catch (error) {
      console.error("Failed to get cart books", error);
      return [];
    }
  };

  return {
    books,
    filteredBooks,
    wishlistBooks,
    setWishlistBooks,
    filterBooks,
    handleWishlist,
    removeFromWishlist,
    handleUpdateBooks,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    handleDelete,
    handleIncrement,
    handleDecrement,
    handleAdd,
    getCartBooks,
    fetchCartBooks,
  };
};

export default useBooks;
