import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import PropTypes from "prop-types"

const PrivateRoute = ({ element, roles }) => {
	const { currentUser, loading, isAdmin } = useAuth()

	if (loading) {
		return <div>Loading...</div>
	}

	if (!currentUser) {
		return <Navigate to="/auth" />
	}

	if (roles && !roles.includes(currentUser.role)) {
		return <Navigate to="/" />
	}

	if (roles && roles.includes("admin") && !isAdmin) {
		return <Navigate to="/" />
	}

	return element
}
PrivateRoute.propTypes = {
	element: PropTypes.element.isRequired,
	roles: PropTypes.arrayOf(PropTypes.string),
}

export default PrivateRoute
