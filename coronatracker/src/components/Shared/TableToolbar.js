import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import ExportButton from "../Buttons/ExportButton";

export default function TableToolbar(props) {
  const { columns, filename, rows, title } = props;
  return (
    <Toolbar>
      <Typography color="inherit" align="left" variant="h5">
        {title}
      </Typography>
      <ExportButton filename={filename} columns={columns} rows={rows} />
    </Toolbar>
  );
}