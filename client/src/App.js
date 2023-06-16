


import React from "react"
import { Routes, Route } from "react-router-dom"
import router from "./router/Router.jsx"
// import "./assets/styles/app.scss"
import { BookProvider } from "./context/BookContext"
import { AuthProvider } from "./context/AuthContext"



function App() {
	return (
		<AuthProvider>
			<BookProvider >
				<Routes>
					{router.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						>
							{route.children && route.children.map((childRoute, childIndex) => (
								<Route
									key={childIndex}
									path={childRoute.path}
									element={childRoute.element}
								/>
							))}
						</Route>
					))}
				</Routes>
			</BookProvider>
		</AuthProvider>
	)
}

export default App
