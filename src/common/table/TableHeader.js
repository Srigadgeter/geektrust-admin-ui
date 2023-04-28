// external imports
import React from "react";

// TableHeader Component
const TableHeader = ({ columns, isSelectedAll, isSelectable, showActions, handleSelectAll }) => {
  const handleCheckboxChange = ({ target: { checked } }) => handleSelectAll(checked);

  return (
    <div className="tableHeader">
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
