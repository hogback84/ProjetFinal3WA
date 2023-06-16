import React from "react";

import { Link } from "react-router-dom";
import "../assets/styles/components/_adminlayout.scss";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div>
        <h2>Admin Page</h2>
      </div>
      <div className="admin-layout">
        <nav>
          <ul>
            <li>
              <Link to="/admin/addnewitem">Aggiungi nuovo elemento</Link>
            </li>
            <li>
              <Link to="/admin/edititem">Modifica elemento</Link>
            </li>
            <li>
              <Link to="/admin/managment">Gestione</Link>
            </li>
          </ul>
        </nav>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
