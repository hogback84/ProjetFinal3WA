import React, { useState, createContext, useEffect } from "react"
import apiClient from "../services/apiClient.js"
import PropTypes from "prop-types"

const BookContext = createContext({
	books: [],
	filteredBooks: [],
	selectedPrice: null,
	setFilteredBooks: () => {},
})
export const BookProvider = ({ children }) => {
	const [books, setBooks] = useState([])

	const [filteredBooks, setFilteredBooks] = useState([])
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await apiClient.get("/books")
				const data = response.data

				setBooks(data)
			} catch (error) {
				console.error("Failed to fetch books", error)
			}
		}

		fetchBooks()
	}, [])

	const handleCart = (book) => {
		const updatedBooks = books.map((b) => {
			if (b.id === book.id) {
				return { ...b, isInCart: true, count: b.count + 1 }
			}
			return b
		})
		setBooks(updatedBooks)
		setFilteredBooks(updatedBooks)
		localStorage.setItem("books", JSON.stringify(updatedBooks))
	}

	const handleRemoveItem = async (book) => {
		const updatedBooks = books.map((b) => {
			if (b.id === book.id) {
				return { ...b, wishlist: false, isInCart: false }
			}
			return b
		})
		setBooks(updatedBooks)
		setFilteredBooks(updatedBooks)
		localStorage.setItem("books", JSON.stringify(updatedBooks))
	}
	const handleEdit = async (updatedBook) => {
		try {
			await apiClient.put(`/books/${updatedBook.id}`, updatedBook)
			const updatedBooks = books.map((b) => {
				if (b.id === updatedBook.id) {
					return updatedBook
				}
				return b
			})
			setBooks(updatedBooks)
			setFilteredBooks(updatedBooks)
		} catch (error) {
			console.error("Failed to update book", error)
		}
	}
	const handleAdd = async (newBook) => {
		try {
			const response = await apiClient.post("/books", newBook)
			const addedBook = response.data
			setBooks((prevBooks) => [...prevBooks, addedBook])
			setFilteredBooks((prevBooks) => [...prevBooks, addedBook])
		} catch (error) {
			console.error("Failed to add book", error)
			// You can also set an error state here and display it in the AddNewItem component
		}
	}

	const handleDelete = async (book) => {
		try {
			await apiClient.delete(`/books/${book.id}`)
			const newBooks = books.filter((p) => book.id !== p.id)
			setBooks(newBooks)
			setFilteredBooks(newBooks)
		} catch (error) {
			console.error("Failed to delete book", error)
		}
	}

	const handleIncrement = (book) => {
		const updatedBooks = books.map((b) => {
			if (b.id === book.id) {
				return { ...b, count: b.count + 1 }
			}
			return b
		})
		setBooks(updatedBooks)
		setFilteredBooks(updatedBooks)
		localStorage.setItem("books", JSON.stringify(updatedBooks))
	}

	const onDelete = (book) => {
		const updatedBooks = books.map((b) => {
			if (b.id === book.id) {
				b.isInCart = false
				b.count = 0
			}
			return b
		})
		setBooks(updatedBooks)
		localStorage.setItem("books", JSON.stringify(updatedBooks))
	}

	const handleDecrement = (book) => {
		const updatedBooks = books.map((b) => {
			if (b.id === book.id) {
				return { ...b, count: b.count > 1 ? b.count - 1 : b.count }
			}
			return b
		})
		setBooks(updatedBooks)
		setFilteredBooks(updatedBooks)
		localStorage.setItem("books", JSON.stringify(updatedBooks))
	}

	const handleUpdateBooks = async (bookId, updatedBook) => {
		try {
			await apiClient.put(`/books/${bookId}`, updatedBook)
			const updatedBooks = books.map((book) => {
				if (book.id === bookId) {
					return { ...updatedBook }
				}
				return book
			})
			setBooks(updatedBooks)
		} catch (error) {
			console.error("Failed to update book", error)
		}
	}

	const filterBooks = (books, searchTitle, selectedPrice) => {
		const filteredBooks = books.filter((book) => {
			const titleMatches = searchTitle
				? book.title.toLowerCase().startsWith(searchTitle.toLowerCase())
				: true

			const priceMatches = selectedPrice
				? book.price >= selectedPrice - 5 && book.price <= selectedPrice
				: true

			const isMatch = titleMatches && priceMatches
			return isMatch
		})

		return searchTitle ? filteredBooks : books
	}

	return (
		<BookContext.Provider
			value={{
				books,
				filteredBooks,
				filterBooks,

				handleCart,
				handleRemoveItem,
				handleDelete,
				handleIncrement,
				handleDecrement,

				handleAdd,
				handleEdit,
				onDelete,
				handleUpdateBooks,
			}}
		>
			{children}
		</BookContext.Provider>
	)
}
BookProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
export default BookContext
