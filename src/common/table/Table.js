// external imports
import React, { useEffect, useState } from "react";

// internal imports
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

// styles
import "./styles/Table.css";

// Table Component
const Table = ({
  columns = [],
  records = [],
  recordsPerPage,
  isSelectable = false,
  showRowActions = false,
  showPagination = false
}) => {
  const [data, setData] = useState(records);
  const [rows, setRows] = useState(data.slice(0, recordsPerPage));
  const [selections, setSelections] = useState([]);
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Handler helps to change the state of the select all checkbox in the header
  // It helps to keep UI in sync
  const handleChangeSelectAll = () => {
    if (rows.length === selections.length) setSelectedAll(true);
    else setSelectedAll(false);
  };

  // Handler helps to select/deselect all the rows when the user directly selects the checkbox in the header
  const handleSelectAll = (checked) => {
    setSelectedAll(checked);
    setSelections(checked ? rows.map((item) => item?.id) : []);
  };

  // Handler helps to select/deselect the individual record
  const handleRowSelection = (id) => {
    const selectionsCopy = [...selections];
    const isIdPresent = selectionsCopy.some((item) => item === id);

    if (isIdPresent) setSelections(selectionsCopy.filter((item) => item !== id));
    else setSelections([...selectionsCopy, id]);
  };

  // Helper function helps to refresh the table data
  // It helps to keep UI in sync
  const refreshPageData = (page) => {
    const start = (page - 1) * recordsPerPage;
    const end = page * recordsPerPage;
    const currentPageData = data.slice(start, end);
    // Set records for the page
    setRows(currentPageData);
    // Clear the selections while page change
    setSelections([]);
  };

  // Handler helps to delete all the selected records
  const handleDeleteSelected = () => {
    const filteredData = data.map((item) => {
      if (selections.some((id) => id === item?.id)) return null;
      return item;
    });
    const removedNulls = filteredData.filter((item) => item);
    setData(removedNulls);
    setSelections([]);
  };

  // Handler helps to edit the individual record in the table
  const handleRowEdit = (id) => {
    console.warn("edit id >>", id);
    // TODO: Work on edit functionality
  };

  // Handler helps to delete the individual record in the table
  const handleRowDelete = (id) => {
    const filteredData = data.filter((item) => item?.id !== id);
    setData(filteredData);
  };

  useEffect(() => {
    handleChangeSelectAll();
  }, [selections]);

  useEffect(() => {
    setCurrentPage(1);
  }, [recordsPerPage]);

  useEffect(() => {
    refreshPageData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const pageCount = Math.ceil(data.length / recordsPerPage);
    const page = currentPage <= pageCount ? currentPage : pageCount;
    refreshPageData(page);
    setCurrentPage(page);
  }, [data]);

  return (
    <div className="table">
      <TableHeader
        columns={columns}
        isSelectable={isSelectable}
        showActions={showRowActions}
        isSelectedAll={isSelectedAll}
        handleSelectAll={handleSelectAll}
      />
      <TableBody
        rows={rows}
        columns={columns}
        selections={selections}
        isSelectable={isSelectable}
        handleRowEdit={handleRowEdit}
        showRowActions={showRowActions}
        recordsPerPage={recordsPerPage}
        handleRowDelete={handleRowDelete}
        handleRowSelection={handleRowSelection}
      />
      <TableFooter
        selections={selections}
        currentPage={currentPage}
        totalRecords={data.length}
        isSelectable={isSelectable}
        showPagination={showPagination}
        recordsPerPage={recordsPerPage}
        setCurrentPage={setCurrentPage}
        handleDeleteSelected={handleDeleteSelected}
      />
    </div>
  );
};

export default Table;
