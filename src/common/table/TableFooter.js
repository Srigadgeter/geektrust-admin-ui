// external imports
import React from "react";

// internal imports
import Pagination from "common/pagination/Pagination";

// TableFooter Component
const TableFooter = ({
  selections,
  currentPage,
  totalRecords,
  isSelectable,
  recordsPerPage,
  setCurrentPage,
  showPagination,
  handleDeleteSelected
}) => (
  <div className="tableFooter">
    {isSelectable && (
      <button
        type="button"
        className="deleteBtn"
        disabled={!selections.length}
        onClick={handleDeleteSelected}>
        Delete Selected
      </button>
    )}
    {showPagination && (
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        setCurrentPage={setCurrentPage}
      />
    )}
  </div>
);

export default TableFooter;
