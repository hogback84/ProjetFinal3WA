import React from "react";
import "../assets/styles/pages/_home.scss";

const Home = () => {
  const generateCarouselItem = () => {
    let items = [];
    for (let i = 1; i < 4; i++) {
      items.push(
        <div
          key={i} // Aggiungi una prop key univoca qui
          className={i === 1 ? "carousel-item active" : "carousel-item"}
        >
          <div id={`img${i}`} role="img" aria-label="immage_carrosel" />

          <div className="home-img-text">
            <h1>
              Momo <b> Book Store</b>
            </h1>
            <p>
              Bienvenue chez Momo Bookstore, votre librairie en ligne de
              confiance ! Nous proposons une large sélection de livres couvrant
              divers genres et sujets.
            </p>
          </div>
        </div>
      );
    }
    return items;
  };

  return (
    <React.Fragment>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">{generateCarouselItem()}</div>
      </div>
    </React.Fragment>
  );
};

export default Home;
