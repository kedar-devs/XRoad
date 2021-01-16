import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EjectIcon from "@material-ui/icons/Eject";
import ProgressStatus from "./ProgressStatus";
import moment from "moment";
import { Link } from "react-router-dom";
const columns = [
  { id: "name", label: "Area", minWidth: 150 },
  { id: "code", label: "Date", minWidth: 100 },
  {
    id: "population",
    label: "Status",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Upvote",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData("India", Date.now(), 12, "upvote"),
  createData("China", Date.now(), 35, "upvote"),
  createData("Italy", Date.now(), 73, "upvote"),
  createData("United States", Date.now(), 43, "upvote"),
  createData("Canada", Date.now(), 16, "upvote"),
  createData("Australia", Date.now(), 25, "upvote"),
  createData("Germany", Date.now(), 83, "upvote"),
  createData("Ireland", Date.now(), 70, "upvote"),
  createData("Mexico", Date.now(), 65, "upvote"),
  createData("Japan", Date.now(), 70, "upvote"),
  createData("France", Date.now(), 20, "upvote"),
  createData("United Kingdom", Date.now(), 95, "upvote"),
  createData("Russia", Date.now(), 44, "upvote"),
  createData("Nigeria", Date.now(), 96, "upvote"),
  createData("Brazil", Date.now(), 47, "upvote"),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: "transparent",
    color: "white",
  },
  container: {
    maxHeight: "calc(100vh - 80px)",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "rgba(0,0,0,.7)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    style={{ background: "rgba(0,0,0,.5)" }}
                  >
                    <TableCell style={{ color: "white " }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ color: "white " }}>
                      {moment(row.code).format("MMMM Do YYYY")}
                    </TableCell>
                    <TableCell align={"right"}>
                      <ProgressStatus value={row.population} />
                    </TableCell>
                    <TableCell align={"right"}>
                      <Link to={`/upvote/1`} style={{ color: "white " }}>
                        <EjectIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{ color: "white " }}
      />
    </Paper>
  );
}
