// external imports
import React, { useState } from "react";

// styles
import "./styles/Search.css";

// Search Component
const Search = ({ searchFields, searchedText = "", setSearchedText }) => {
  const [searchText, setSearchText] = useState("");

  const placeholderText =
    searchFields.length > 1
      ? `Search by ${searchFields.slice(0, -1).join(",")} or ${searchFields.slice(-1)}`
      : `Search by ${searchFields[0]}`;

  // Handler helps to update the state for change in value of input field
  const handleChange = ({ target: { value } }) => setSearchText(value);

  // Handler helps to set search text when user presses the Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) setSearchedText(searchText);
  };

  // Handler helps to update the state for change in value of input field
  const handleClearSearch = () => {
    setSearchText("");
    if (searchedText) setSearchedText("");
  };

  return (
    <div className="search">
      <input
        value={searchText}
        onChange={handleChange}
        className="searchField"
        onKeyDown={handleKeyDown}
        placeholder={placeholderText}
      />
      <span className="searchIcon bi bi-search" />
      {(searchText || searchedText) && (
        <span
          role="presentation"
          onClick={() => handleClearSearch()}
          className="clearIcon bi bi-x-circle"
        />
      )}
    </div>
  );
};

export default Search;
