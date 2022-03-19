import { useQueryState } from "hooks/useQueryState";
import { useEffect, useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  Box,
  CircularProgress,
} from "@mui/material";
import { TableRow, TableFooter, TableHeader } from ".";
import { StringUtil } from "helpers/string-util";
import Api from "helpers/api";

function PaginatedTable({
  src,
  schema,
  onEdit,
  onDelete,
  isEditable,
  headerProps,
  fetchFrom,
}) {
  const [displayData, setDisplayData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useQueryState("page", 0, "number");
  const [total, setTotal] = useState(0);

  useEffect(() => fetchData(), [page, rowsPerPage, fetchFrom]);

  const onSearch = (event) => {
    const { value } = event.target;

    if (value?.length >= 3) {
    }

    setQuerySearch(value);
  };

  const fetchData = () => {
    const urlParams = `?limit=${rowsPerPage}&skip=${page * rowsPerPage}`;

    Api.fetchInternal(`${fetchFrom}${urlParams}`).then((res) => {
      const { data, total } = res;
      const maxPage = Math.floor(total / rowsPerPage);

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

  if (!displayData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginBlock: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      <Box sx={{ m: 2 }}>
        <TableHeader
          querySearch={querySearch}
          onSearch={onSearch}
          {...headerProps}
        />
      </Box>
      <MuiTable>
        <TableBody>
          {displayData?.length > 0 &&
            displayData.map((element) => (
              <TableRow
                key={element._id}
                onEdit={!!onEdit ? () => onEdit(element._id) : null}
                src={src}
                onDelete={onDelete}
                isEditable={isEditable}
                data={{
                  _id: StringUtil.getNestedKey(schema["_id"], element),
                  name: StringUtil.getNestedKey(schema["name"], element),
                  avatar:
                    schema["avatar"] &&
                    StringUtil.getNestedKey(schema["avatar"], element),
                  description:
                    schema["description"] &&
                    StringUtil.getNestedKey(schema["description"], element),
                  owner:
                    schema["owner"] &&
                    (StringUtil.getNestedKey(schema["owner"], element) ?? "*"),
                }}
              />
            ))}
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
