// external imports
import React, { useEffect, useState } from "react";

// TableRow Component
const TableRow = ({
  row,
  columns,
  isLastRow,
  editOptions,
  isSelectable,
  isRowSelected,
  handleRowEdit,
  showRowActions,
  handleRowDelete,
  handleRowSelection
}) => {
  const [rowData, setRowData] = useState({});
  const [isRowEdit, setRowEdit] = useState(false);

  useEffect(() => {
    setRowData(row);
  }, [row]);

  // Note: Currently, supporting edit option only for input type text & email
  // Handler helps to work on input change
  const handleInputChange = (value, col) => {
    const tempObj = { ...rowData };
    tempObj[col] = value;
    setRowData(tempObj);
  };

  // Handler helps to save the changes & send the row data to the parent
  const handleSave = () => {
    handleRowEdit(rowData);
    setRowEdit(false);
  };

  // Handler helps to revert back to readonly mode
  const handleCancel = () => {
    setRowData(row);
    setRowEdit(false);
  };

  return (
    <div
      className={`tableRow ${isRowSelected ? "selected" : ""} ${isLastRow ? "last" : ""} ${
        isRowEdit ? "edit" : ""
      }`}>
      {isSelectable && (
        <div className="tableColumn tableSelection">
          <input
            type="checkbox"
            disabled={isRowEdit}
            checked={isRowSelected}
            onChange={() => handleRowSelection(rowData?.id)}
          />
        </div>
      )}
      {columns.map((col, index) => (
        <div
          key={`row-${rowData?.id}-col-${index + 1}`}
          className={`tableColumn ${isRowEdit ? "" : "showEllipsis"}`}>
          {isRowEdit && Object.keys(editOptions).some((item) => item === col) ? (
            <input
              value={rowData[col]}
              className="editField"
              type={editOptions[col]}
              onChange={({ target: { value } }) => handleInputChange(value, col)}
            />
          ) : (
            rowData[col]
          )}
        </div>
      ))}
      {showRowActions && !isRowEdit && (
        <div className="tableColumn">
          <span
            role="presentation"
            onClick={() => setRowEdit(true)}
            className="actionIcon actionEdit bi bi-pencil-square"
          />
          <span
            role="presentation"
            onClick={() => handleRowDelete(rowData?.id)}
            className="actionIcon actionDelete bi bi-trash"
          />
        </div>
      )}
      {showRowActions && isRowEdit && (
        <div className="tableColumn">
          <span
            role="presentation"
            onClick={() => handleSave()}
            className="actionIcon actionSave bi bi-check-circle"
          />
          <span
            role="presentation"
            onClick={() => handleCancel()}
            className="actionIcon actionCancel bi bi-x-circle"
          />
        </div>
      )}
    </div>
  );
};

export default TableRow;
