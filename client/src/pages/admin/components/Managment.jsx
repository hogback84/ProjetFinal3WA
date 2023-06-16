import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout.jsx";
import { useAuth } from "../../../context/AuthContext.js";
import "../../../assets/styles/components/_managment.scss";

const Managment = () => {
  const [users, setUsers] = useState([]);

  const { currentUser } = useAuth();
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserRole = async (userId, newRoleId) => {
    try {
      const access_token = currentUser.token;
      const response = await axios.put(
        "http://localhost:8800/api/users/update-role",
        {
          userId,
          newRoleId,
          access_token,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getUsers();
      } else {
        console.error("Error updating user role:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getUsers();
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>
      <div>
        <table className="table mx-auto w-75">
          <thead className="thead-dark me-auto">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Created_at</th>
              <th scope="col">Updated_at</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role_name}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>
                  <button onClick={() => updateUserRole(user.id, "1")}>
                    Set as Admin
                  </button>
                  <button onClick={() => updateUserRole(user.id, "2")}>
                    Set as User
                  </button>

                  <i
                    className="fas fa-trash delete"
                    onClick={() => deleteUser(user.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Managment;
