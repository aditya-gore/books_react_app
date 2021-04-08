import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
// import { genres } from "../../services/fakeGenreService";

const Table = (props) => {
  const { columns, sortColumn, onSort, data, genres } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} genres={genres} />
    </table>
  );
};

export default Table;
