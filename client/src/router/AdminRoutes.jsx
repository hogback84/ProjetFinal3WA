import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage.jsx";
import PrivateRoute from "../services/PrivateRoute.js";
import AddNewItem from "../pages/admin/components/AddNewItem.jsx";
import EditItem from "../pages/admin/components/EditItem";
import Managment from "../pages/admin/components/Managment";
import EditBook from "../pages/admin/components/EditBook";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route
        path="/addnewitem"
        element={<PrivateRoute element={<AddNewItem />} roles={["admin"]} />}
      />
      <Route
        path="/edititem"
        element={<PrivateRoute element={<EditItem />} roles={["admin"]} />}
      />
      <Route
        path="/managment"
        element={<PrivateRoute element={<Managment />} roles={["admin"]} />}
      />
      <Route
        path="/edit-book/:id"
        element={<PrivateRoute element={<EditBook />} roles={["admin"]} />}
      />
    </Routes>
  );
};

export default AdminRoutes;
