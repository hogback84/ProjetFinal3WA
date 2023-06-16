import React from "react";
import "../assets/styles/pages/_aboutus.scss";

const Aboutus = () => {
  return (
    <div className="aboutus">
      <div className="text-secondary p-2 ">
        <div className="title-about fw-bold text-center">
          <h1>À propos de MomoBookShop</h1>
        </div>
        <p>
          MomoBookShop est une bibliothèque en ligne spécialisée dans la vente
          de livres neufs et d'occasion. Nous sommes passionnés par la
          littérature et nous nous efforçons de fournir à nos clients une
          expérience de lecture exceptionnelle. Notre mission est de promouvoir
          la lecture et l'apprentissage en offrant une sélection variée de
          titres et genres.
        </p>
        <p>
          Depuis notre fondation en 2023, nous avons aidé des milliers de
          lecteurs à travers le monde à trouver leurs livres préférés et à
          découvrir de nouveaux auteurs talentueux. Nous sommes fiers de notre
          service clientèle et de notre engagement à fournir une expérience
          d'achat agréable et sans tracas.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
