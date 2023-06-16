import { useState, useEffect, useCallback, useContext } from "react"
import BookContext from "../context/BookContext.js"

export const usePagination = (items, itemsPerPage, searchTitle, selectedPrice) => {
	const { filterBooks } = useContext(BookContext)
	const [currentPage, setCurrentPage] = useState(1)


	const filteredItems = filterBooks(items, searchTitle, selectedPrice)
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

	const getCurrentPageItems = useCallback(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		return filteredItems.slice(startIndex, endIndex)
	}, [currentPage, itemsPerPage, filteredItems])

	useEffect(() => {
		getCurrentPageItems()
	}, [currentPage, itemsPerPage, getCurrentPageItems])

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage)
	}

	return {
		currentPage,
		totalPages,
		getCurrentPageItems,
		handlePageChange,
	}
}

