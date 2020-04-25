import React from "react";
import { CsvBuilder } from "filefy";
import { IconButton, Tooltip } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";

export default function ExportButton(props) {
  const { columns, filename, rows } = props;

  const exportToCSV = () => {
    const builder = new CsvBuilder(filename)
    builder
      .setDelimeter(",")
      .setColumns(columns)
      .addRows(rows)
      .exportFile()
  }

  return (
    <Tooltip title="Export to CSV" placement="right">
      <span>
        <IconButton
          color="inherit"
          disabled={rows.length === 0}
          onClick={exportToCSV}
        >
          <GetApp />
        </IconButton>
      </span>
    </Tooltip>
  );
}