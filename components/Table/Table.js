import { getNestedKey } from "@lierno/core-helpers";
import { Table as MuiTable, TableBody, Box } from "@mui/material";
import { useQueryState } from "hooks/useQueryState";
import { useEffect, useState } from "react";
import { TableRow, TableFooter, TableHeader } from ".";

function Table({ data = [], onEdit, onDelete, src, isEditable, headerProps, getRowData }) {
  const [displayData, setDisplayData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useQueryState("page", 0, "number");

  useEffect(() => {
    if (!!querySearch) {
      const newData = data.filter((element) => element.name.toLowerCase().includes(querySearch.toLowerCase()));
      setDisplayData(newData);
    } else {
      setDisplayData(data);
    }
  }, []);

  const onSearch = (event) => {
    const { value } = event.target;

    if (value?.length >= 3) {
      const newData = data.filter((element) => element.name.toLowerCase().includes(value.toLowerCase()));

      setDisplayData(newData);
    } else if (value?.length !== data.length) {
      setDisplayData(data);
    }
    setQuerySearch(value);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <TableHeader querySearch={querySearch} onSearch={onSearch} {...headerProps} />
      </Box>
      <MuiTable>
        <TableBody>
          {displayData &&
            displayData.length > 0 &&
            displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => {
              const rowData = getRowData(element);

              return (
                <TableRow
                  key={element._id}
                  onEdit={!!onEdit ? () => onEdit(element._id) : null}
                  src={src}
                  onDelete={onDelete}
                  isEditable={isEditable}
                  data={rowData}
                />
              );
            })}
        </TableBody>
        <TableFooter
          page={page}
          rowsPerPage={rowsPerPage}
          total={displayData.length}
          handleChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </MuiTable>
    </>
  );
}

export { Table };
