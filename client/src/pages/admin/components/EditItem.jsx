import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout.jsx";
import { usePagination } from "../../../utils/Pagination.js";
import "../../../assets/styles/components/_edititem.scss";
import BookContext from "../../../context/BookContext.js";

const EditItem = () => {
  const { books, handleDelete, error } = useContext(BookContext);

  const navigate = useNavigate();
  const [editBooks, setEditBooks] = useState(books);
  const { currentPage, totalPages, getCurrentPageItems, handlePageChange } =
    usePagination(editBooks, 10);

  useEffect(() => {
    setEditBooks(books);
  }, [books]);
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  return (
    <AdminLayout>
      <div>
        <table className="table mx-auto w-75">
          <thead className="thead-dark me-auto">
            <tr>
              <th scope="col">Book image</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col">Book genre</th>
              <th scope="col">Book description</th>
              <th scope="col">Book Price</th>
              <th scope="col">Book Stock</th>
              <th scope="col">Book id</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageItems().map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="bookImage"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{truncateDescription(book.description, 100)}</td>
                <td>{book.price}</td>
                <td>{book.stock}</td>
                <td>{book.id}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/edit-book/${book.id}`)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <i
                    className="fas fa-trash delete"
                    onClick={() => handleDelete(book)}
                  ></i>{" "}
                  {error && (
                    <div className="alert alert-danger">{error.message}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditItem;
