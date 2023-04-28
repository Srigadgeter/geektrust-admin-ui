// external imports
import React from "react";

// internal imports
import Table from "common/table/Table";
import { RECORDS_PER_PAGE } from "constants/appConstants";

// mocks
import UserData from "mocks/Members";

// Users Page
const Users = () => {
  const keys = Object.keys(UserData[0]);
  const columns = keys.filter((item) => item !== "id");

  return (
    <Table
      isSelectable
      showRowActions
      showPagination
      columns={columns}
      records={UserData}
      recordsPerPage={RECORDS_PER_PAGE}
    />
  );
};

export default Users;
