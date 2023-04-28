// external imports
import React from "react";

// internal imports
import { RECORDS_PER_PAGE } from "constants/appConstants";
import TableRow from "./TableRow";

// TableBody Component
const TableBody = ({
  rows,
  columns,
  selections,
  isSelectable,
  handleRowEdit,
  showRowActions,
  handleRowDelete,
  handleRowSelection,
  recordsPerPage = RECORDS_PER_PAGE
}) => (
  <div className="tableBody" style={{ minHeight: `${recordsPerPage * 40}px` }}>
    {rows.map((row, index) => (
      <TableRow
        row={row}
        columns={columns}
        key={`row-${index + 1}`}
        isSelectable={isSelectable}
        handleRowEdit={handleRowEdit}
        showRowActions={showRowActions}
        handleRowDelete={handleRowDelete}
        isLastRow={rows.length === index + 1}
        handleRowSelection={handleRowSelection}
        isRowSelected={selections.some((item) => item === row?.id)}
      />
    ))}
  </div>
);

export default TableBody;
