import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import BookContext from "../../../context/BookContext.js";
import Alert from "../../../components/Alert.jsx";
import AdminLayout from "../../../layout/AdminLayout.jsx";
import "../../../assets/styles/components/_editbook.scss";

const EditBook = () => {
  const { books, handleUpdateBooks } = useContext(BookContext);

  const { id } = useParams();
  const bookId = parseInt(id);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const bookToEdit = books.find((book) => book.id === bookId);
    if (bookToEdit) {
      setBook(bookToEdit);
      setLoading(false);
    }
  }, [books, bookId]);

  console.log("Book ID:", id);

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Controllo se i campi obbligatori sono stati compilati
    if (
      !book.title ||
      !book.author ||
      !book.genre ||
      !book.description ||
      !book.price ||
      !book.stock
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    // Controllo se il prezzo o lo stock sono negativi
    if (book.price < 0 || book.stock < 0) {
      alert("Price and stock cannot be negative.");
      return;
    }
    // Se la validazione è passata, procedo con l'aggiornamento del libro
    handleUpdateBooks(book.id, book);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      navigate("/admin/edititem");
    }, 2000);
  };

  const handleReset = () => {
    console.log("Reset button clicked"); // Aggiungi questo log per verificare se il pulsante Reset viene effettivamente premuto
    const originalBook = books.find((book) => book.id === bookId);
    console.log("Original book info:", originalBook); // Verifica se le informazioni originali del libro vengono recuperate correttamente
    setBook({ ...originalBook });
  };

  return (
    <AdminLayout>
      {alert ? <Alert message={"Book updated successfully!"} /> : null}
      <div className="title my-3 text-center">
        <h2>
          Edit <b>Book</b>
        </h2>
      </div>
      <form className="editbooks" onSubmit={handleSubmit}>
        <div className="mb-3 itemdata">
          <label htmlFor="bookName" className="form-label">
            Book image
          </label>
          <input
            name="image_url"
            type="text"
            className="form-control"
            value={book.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 itemdata">
          <label htmlFor="bookName" className="form-label">
            Book Name
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={book.title}
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
            value={book.author}
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
            value={book.genre}
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
            value={book.description}
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
            value={book.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 itemdata">
          <label htmlFor="bookPrice" className="form-label">
            Book stock
          </label>
          <input
            name="stock"
            type="number"
            className="form-control"
            value={book.stock}
            onChange={handleChange}
          />
        </div>
        {/* Book ID */}
        <div className="mb-3 itemdata">
          <label htmlFor="bookId" className="form-label">
            Book ID
          </label>
          <input
            name="id"
            type="number"
            className="form-control"
            value={book.id}
            onChange={handleChange}
            disabled
          />
        </div>
        {/* Buttons */}
        <div className="itemdata d-inline-flex">
          <button
            type="submit"
            className="btn btn-danger px-5 mx-2 rounded-pill"
          >
            Confirm Update
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-danger px-5 rounded-pill"
          >
            Reset
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditBook;
