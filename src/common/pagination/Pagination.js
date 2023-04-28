// external imports
import React from "react";

// internal imports
import { RECORDS_PER_PAGE } from "constants/appConstants";

// styles
import "./styles/Pagination.css";

// Pagination Component
const Pagination = ({
  totalRecords,
  setCurrentPage,
  currentPage = 1,
  recordsPerPage = RECORDS_PER_PAGE
}) => {
  const pageCount = Math.ceil(totalRecords / recordsPerPage);

  // Handler helps to change the page to first
  const handleFirst = () => setCurrentPage(1);

  // Handler helps to change the page to last
  const handleLast = () => setCurrentPage(pageCount);

  // Handler helps to change the page to previous page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handler helps to change the page to next page
  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1);
  };

  // Handler helps to change the page to specific page
  const handlePageSelection = (page) => setCurrentPage(page);

  return (
    <div className="pagination">
      <span
        role="presentation"
        onClick={handleFirst}
        className={`paginationItem ${currentPage > 1 ? "" : "disabled"}`}>
        &lt;&lt;
      </span>
      <span
        role="presentation"
        onClick={handlePrevious}
        className={`paginationItem ${currentPage > 1 ? "" : "disabled"}`}>
        &lt;
      </span>
      {new Array(pageCount).fill(0).map((item, index) => (
        <span
          role="presentation"
          key={`pagination-${index + 1}`}
          onClick={() => handlePageSelection(index + 1)}
          className={`paginationItem ${currentPage === index + 1 ? "selected" : ""}`}>
          {index + 1}
        </span>
      ))}
      <span
        role="presentation"
        onClick={handleNext}
        className={`paginationItem ${currentPage < pageCount ? "" : "disabled"}`}>
        &gt;
      </span>
      <span
        role="presentation"
        onClick={handleLast}
        className={`paginationItem ${currentPage < pageCount ? "" : "disabled"}`}>
        &gt;&gt;
      </span>
    </div>
  );
};

export default Pagination;
