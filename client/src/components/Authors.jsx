import { useState } from "react";
import { authors } from "../data/authors.js";
import "../assets/styles/components/_authors.scss";

const Authors = () => {
  const [search, setSearch] = useState("");
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
  const authorsToShow = 4;

  const nextAuthor = () => {
    setCurrentAuthorIndex(
      (prevIndex) => (prevIndex + 1) % (authors.length - authorsToShow + 1)
    );
  };

  const prevAuthor = () => {
    setCurrentAuthorIndex(
      (prevIndex) =>
        (prevIndex - 1 + (authors.length - authorsToShow + 1)) %
        (authors.length - authorsToShow + 1)
    );
  };

  return (
    <section className="Authors">
      <h2>
        Famous <b>Authors</b>
      </h2>
      <div className="authors-search-wrapper">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search in authors"
        />
      </div>
      <div className="container">
        <div className="author-slider">
          {authors
            .filter((a) => a.name.toLowerCase().includes(search))
            .map((author, index) => (
              <div
                key={author.id}
                className={`author ${
                  index >= currentAuthorIndex &&
                  index < currentAuthorIndex + authorsToShow
                    ? "active"
                    : ""
                }`}
              >
                <img
                  src={author.image}
                  alt={`${author.name}'s portrait`}
                  className="author-img"
                />

                <h2 className="author-name">{author.name}</h2>
              </div>
            ))}
        </div>

        <button className="prev-btn" onClick={prevAuthor}>
          {"<"}
        </button>
        <button className="next-btn" onClick={nextAuthor}>
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Authors;
