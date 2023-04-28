// external imports
import React from "react";

// internal imports
import Search from "common/search/Search";

// TableHeader Component
const TableHeader = ({
  columns,
  showSearch,
  showActions,
  searchFields,
  searchedText,
  isSelectable,
  isSelectedAll,
  setSearchedText,
  handleSelectAll
}) => {
  const handleCheckboxChange = ({ target: { checked } }) => handleSelectAll(checked);

  return (
    <div className="tableHeader">
      {showSearch && (
        <Search
          searchFields={searchFields}
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
      )}
      <div className="tableColumns">
        {isSelectable && (
          <div className="tableColumn tableSelection">
            <input type="checkbox" checked={isSelectedAll} onChange={handleCheckboxChange} />
          </div>
        )}
        {columns.map((col, index) => (
          <div key={`column-${index + 1}`} className="tableColumn makeBold showEllipsis">
            {col}
          </div>
        ))}
        {showActions && <div className="tableColumn makeBold showEllipsis">Actions</div>}
      </div>
    </div>
  );
};

export default TableHeader;
