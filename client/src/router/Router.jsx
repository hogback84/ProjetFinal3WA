import React from "react";

import Aboutus from "../pages/Aboutus.jsx";
import Auth from "../pages/Auth.jsx";
import BookDetails from "../pages/BookDetails";
import Allbooks from "../pages/Allbooks";
import Header from "../layout/Header.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Contacts from "../pages/Contacts.jsx";
import Layout from "../layout/Layout.jsx";
import AdminRoutes from "../router/AdminRoutes.jsx";
import ShoppingCart from "../components/ShoppingCart.jsx";

const router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Header />,
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },

      {
        path: "/allbooks/bookdetails/:id",
        element: <BookDetails />,
      },

      {
        path: "/allbooks",
        element: <Allbooks />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/admin/*",
        element: <AdminRoutes />,
      },
      {
        path: "/shoppingcart",
        element: <ShoppingCart />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
];

export default router;
