
import { useState, useEffect } from "react"
import apiClient from "../services/apiClient.js"

export const useFetchBooks = () => {
	const [books, setBooks] = useState([])

	useEffect(() => {
		// Effectuer la requête pour récupérer les livres
		const fetchBooks = async () => {
			try {
				const response = await apiClient.get("/books")
				const data = response.data
				setBooks(data) // Mettre à jour le state avec les données des livres
			} catch (error) {
				console.error("Failed to fetch books", error)
			}
		}
		fetchBooks()// Appeler la fonction fetchBooks au chargement initial du composant
	}, [])

	return books// Retourner les livres pour utilisation dans le composant
}
