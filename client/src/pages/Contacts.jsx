import React, { useState } from "react";
import apiClient from "../services/apiClient";
import "../assets/styles/pages/_contacts.scss";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await apiClient.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      if (response.status === 201) {
        setSuccessMessage("Message submitted successfully!");
      }
    } catch (error) {
      setErrorMessage("Failed to submit message. Please try again.");
    }
  };

  return (
    <div className="contacts">
      <h1>Contactez-nous</h1>
      <p>
        Si vous avez des questions ou des commentaires, n'hésitez pas à nous
        contacter. Nous sommes ravis de vous aider et nous vous répondrons dans
        les plus brefs délais.
      </p>
      {successMessage && (
        <p className="success-message" aria-live="polite">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="error-message" aria-live="polite">
          {errorMessage}
        </p>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          aria-label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          aria-label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="subject">Subject :</label>
        <input
          type="text"
          id="subject"
          name="subject"
          aria-label="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          aria-label="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" aria-label="send">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contacts;
