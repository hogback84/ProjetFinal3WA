import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert.jsx";
import AdminLayout from "../../../layout/AdminLayout.jsx";
import BookContext from "../../../context/BookContext.js";
import "../../../assets/styles/components/_addnewitem.scss";

const AddNewItem = () => {
  const [alert, setAlert] = useState(false);
  const { handleAdd } = useContext(BookContext);
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
    image_url: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // verifica se il valore è un numero e se è maggiore o uguale a zero
    if (name === "price" || name === "stock") {
      if (isNaN(value) || Number(value) < 0) {
        return;
      }
    }
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // controlla se tutti i campi sono stati compilati
    for (const field in newBook) {
      if (newBook[field] === "") {
        return;
      }
    }
    handleAdd(newBook);
    setAlert(true);
    navigate("/admin/edititem");
    resetInputField();
  };

  const resetInputField = () => {
    setNewBook({
      title: "",
      author: "",
      genre: "",
      description: "",
      price: "",
      image_url: "",
      stock: "",
    });
  };
  return (
    <AdminLayout>
      {alert ? <Alert message={"Book added successfully!"} /> : null}
      <div className="title my-3 text-center">
        <h2>
          Add New<b>Book</b>
        </h2>
      </div>
      <form className="editbooks" onSubmit={handleSubmit}>
        {/* Book Name */}
        <div className="mb-3 itemdata">
          <label htmlFor="bookName" className="form-label">
            Book Name
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={newBook.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 itemdata">
          <label htmlFor="bookId" className="form-label">
            Book image_url
          </label>
          <input
            name="image_url"
            type="text"
            className="form-control"
            value={newBook.image_url}
            onChange={handleChange}
          />
        </div>
        {/* Author */}
        <div className="mb-3 itemdata">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            name="author"
            type="text"
            className="form-control"
            value={newBook.author}
            onChange={handleChange}
          />
        </div>
        {/* Genre */}
        <div className="mb-3 itemdata">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            name="genre"
            type="text"
            className="form-control"
            value={newBook.genre}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div className="mb-3 itemdata">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            value={newBook.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Book Price */}
        <div className="mb-3 itemdata">
          <label htmlFor="bookPrice" className="form-label">
            Book Price
          </label>
          <input
            name="price"
            type="number"
            className="form-control"
            value={newBook.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 itemdata">
          <label htmlFor="bookId" className="form-label">
            Book stock
          </label>
          <input
            name="stock"
            type="number"
            className="form-control"
            value={newBook.stock}
            onChange={handleChange}
          />
        </div>
        <div className="itemdata d-inline-flex">
          <button
            type="submit"
            className="btn btn-danger px-5 mx-2 rounded-pill "
            onClick={handleSubmit}
          >
            Add
          </button>
          <button
            type="button"
            onClick={resetInputField}
            className="btn btn-danger px-5 rounded-pill"
          >
            Reset
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddNewItem;
