// external imports
import React from "react";

// TableRow Component
const TableRow = ({
  row,
  columns,
  isLastRow,
  isSelectable,
  isRowSelected,
  handleRowEdit,
  showRowActions,
  handleRowDelete,
  handleRowSelection
}) => (
  <div className={`tableRow ${isRowSelected ? "selected" : ""} ${isLastRow ? "last" : ""}`}>
    {isSelectable && (
      <div className="tableColumn tableSelection">
        <input
          type="checkbox"
          checked={isRowSelected}
          onChange={() => handleRowSelection(row?.id)}
        />
      </div>
    )}
    {columns.map((col, index) => (
      <div key={`row-${row?.id}-col-${index + 1}`} className="tableColumn showEllipsis">
        {row[col]}
      </div>
    ))}
    {showRowActions && (
      <div className="tableColumn">
        <span
          role="presentation"
          onClick={() => handleRowEdit(row?.id)}
          className="actionIcon actionEdit bi bi-pencil-square"
        />
        <span
          role="presentation"
          onClick={() => handleRowDelete(row?.id)}
          className="actionIcon actionDelete bi bi-trash"
        />
      </div>
    )}
  </div>
);

export default TableRow;
