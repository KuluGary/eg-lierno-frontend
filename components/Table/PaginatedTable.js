import { useQueryState } from "hooks/useQueryState";
import { useCallback, useEffect, useState } from "react";
import { Table as MuiTable, TableBody, Box, CircularProgress } from "@mui/material";
import { TableRow, TableFooter, TableHeader } from ".";
import { StringUtil } from "helpers/string-util";
import Api from "helpers/api";
import { FunctionUtil } from "helpers/function-util";

function PaginatedTable({ src, schema, onEdit, onDelete, isEditable, headerProps, fetchFrom, loading }) {
  const [displayData, setDisplayData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useQueryState("page", 0, "number");
  const [total, setTotal] = useState(0);

  useEffect(() => !loading && fetchData(), [page, rowsPerPage, fetchFrom, loading]);

  const debounceSearch = useCallback(
    FunctionUtil.debounce((...args) => fetchData(...args), 1000),
    []
  );

  const onSearch = (event) => {
    const { value } = event.target;

    setQuerySearch(value);
    debounceSearch(undefined, undefined, value);
  };

  const fetchData = (limit = rowsPerPage, skip = page * rowsPerPage, qs = querySearch) => {
    const urlParams = `?limit=${limit}&skip=${skip}&qs=${qs}`;

    Api.fetchInternal(`${fetchFrom}${urlParams}`).then((res) => {
      const { data, total } = res;
      const maxPage = Math.ceil(total / rowsPerPage);

      setTotal(total);
      setDisplayData(data);
      if (page >= maxPage) setPage(maxPage - 1 >= 0 ? maxPage - 1 : 0);
    });
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!displayData || loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginBlock: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      <Box sx={{ m: 2 }}>
        <TableHeader querySearch={querySearch} onSearch={onSearch} {...headerProps} />
      </Box>
      <MuiTable>
        <TableBody>
          {displayData?.length > 0 &&
            displayData.map((element) => {
              const tableHeaders = { ...schema };

              Object.entries(schema).forEach(
                ([key, value]) =>
                  (tableHeaders[key] =
                    typeof value === "function" ? value(element) : StringUtil.getNestedKey(value, element))
              );

              return (
                <TableRow
                  key={element._id}
                  onEdit={!!onEdit ? () => onEdit(element._id) : null}
                  src={src}
                  onDelete={!!onDelete ? () => onDelete(element._id) : null}
                  isEditable={isEditable}
                  data={{
                    ...tableHeaders,
                    // _id: StringUtil.getNestedKey(schema["_id"], element),
                    // name: StringUtil.getNestedKey(schema["name"], element),
                    // avatar: schema["avatar"] && StringUtil.getNestedKey(schema["avatar"], element),
                    // description: schema["description"] && StringUtil.getNestedKey(schema["description"], element),
                    // owner: schema["owner"] && (StringUtil.getNestedKey(schema["owner"], element) ?? "*"),
                  }}
                />
              );
            })}
        </TableBody>
        <TableFooter
          page={page}
          rowsPerPage={rowsPerPage}
          total={total}
          handleChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </MuiTable>
    </>
  );
}

export { PaginatedTable };
