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
  editOptions = [],
  searchFields = [],
  showSearch = false,
  isSelectable = false,
  showRowActions = false,
  showPagination = false
}) => {
  const [data, setData] = useState(records);
  const [rows, setRows] = useState(
    showPagination && recordsPerPage ? data.slice(0, recordsPerPage) : data
  );
  const [selections, setSelections] = useState([]);
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [dataBeforeSearch, setDataBeforeSearch] = useState([]);
  const [isInSearchContext, setIsInSearchContext] = useState(false);

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
    if (showPagination && recordsPerPage) {
      const start = (page - 1) * recordsPerPage;
      const end = page * recordsPerPage;
      const currentPageData = data.slice(start, end);
      // Set records for the page
      setRows(currentPageData);
      // Clear the selections while page change
      setSelections([]);
    }
  };

  // Handler helps to delete all the selected records
  const handleDeleteSelected = () => {
    const filteredData = data.map((item) => {
      if (selections.some((id) => id === item?.id)) return null;
      return item;
    });
    const removedNulls = filteredData.filter((item) => item);
    setData(removedNulls);

    if (showSearch && isInSearchContext) {
      const filteredDataBeforeSearch = dataBeforeSearch.map((item) => {
        if (selections.some((id) => id === item?.id)) return null;
        return item;
      });
      const removedNullsInData = filteredDataBeforeSearch.filter((item) => item);
      setDataBeforeSearch(removedNullsInData);
    }

    // Clear the selections once the delete operation completes
    setSelections([]);
  };

  // Handler helps to edit the individual record in the table
  const handleRowEdit = (rowData) => {
    const filteredData = data.map((item) => {
      if (item?.id === rowData?.id) return rowData;
      return item;
    });
    setData(filteredData);

    if (showSearch && isInSearchContext) {
      const filteredDataBeforeSearch = dataBeforeSearch.map((item) => {
        if (item?.id === rowData?.id) return rowData;
        return item;
      });
      setDataBeforeSearch(filteredDataBeforeSearch);
    }
  };

  // Handler helps to delete the individual record in the table
  const handleRowDelete = (id) => {
    const filteredData = data.filter((item) => item?.id !== id);
    setData(filteredData);

    if (showSearch && isInSearchContext) {
      const filteredDataBeforeSearch = dataBeforeSearch.filter((item) => item?.id !== id);
      setDataBeforeSearch(filteredDataBeforeSearch);
    }
  };

  useEffect(() => {
    handleChangeSelectAll();
  }, [selections]);

  useEffect(() => {
    if (showPagination && recordsPerPage) setCurrentPage(1);
  }, [recordsPerPage]);

  useEffect(() => {
    if (showPagination && recordsPerPage) refreshPageData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchedText) {
      let currentData;
      if (!isInSearchContext) {
        currentData = [...data];
        setDataBeforeSearch(currentData);
        setIsInSearchContext(true);
      } else {
        currentData = [...dataBeforeSearch];
        setDataBeforeSearch(currentData);
      }

      if (searchFields.length > 0) {
        const searchResult = currentData.filter((item) =>
          searchFields.some((field) =>
            item[field].toLowerCase().includes(searchedText.toLowerCase())
          )
        );
        setData(searchResult);
      }
    } else if (isInSearchContext) {
      setData(dataBeforeSearch);
      setIsInSearchContext(false);
      setDataBeforeSearch([]);
    }
  }, [searchedText]);

  useEffect(() => {
    if (showPagination && recordsPerPage) {
      const pageCount = Math.ceil(data.length / recordsPerPage);
      const page = (currentPage <= pageCount ? currentPage : pageCount) || 1;
      refreshPageData(page);
      setCurrentPage(page);
    } else setRows(data);
  }, [data]);

  return (
    <div className="table">
      <TableHeader
        columns={columns}
        showSearch={showSearch}
        searchFields={searchFields}
        searchedText={searchedText}
        isSelectable={isSelectable}
        showActions={showRowActions}
        isSelectedAll={isSelectedAll}
        setSearchedText={setSearchedText}
        handleSelectAll={handleSelectAll}
      />
      <TableBody
        rows={rows}
        columns={columns}
        selections={selections}
        editOptions={editOptions}
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
