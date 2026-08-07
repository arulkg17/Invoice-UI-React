import { useEffect, useState } from "react";

import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
} from "@mui/material";

import { Edit, Delete, Search, Clear } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  fetchCategories,
  deleteCategory,
} from "../../redux/category/categoryThunk";

const CategoryList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { categories, loading, error, totalRecords } = useAppSelector(
    (state) => state.category,
  );

  const [code, setCode] = useState("");

  const [name, setName] = useState("");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadCategories = () => {
    dispatch(
      fetchCategories({
        code,

        name,

        pageNumber: page + 1,

        pageSize: rowsPerPage,
      }),
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSearch = () => {
    setPage(0);

    dispatch(
      fetchCategories({
        code,

        name,

        pageNumber: 1,

        pageSize: rowsPerPage,
      }),
    );
  };

  const handleClear = () => {
    setCode("");

    setName("");

    setPage(0);

    dispatch(
      fetchCategories({
        code: "",

        name: "",

        pageNumber: 1,

        pageSize: rowsPerPage,
      }),
    );
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);

    dispatch(
      fetchCategories({
        code,

        name,

        pageNumber: newPage + 1,

        pageSize: rowsPerPage,
      }),
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const size = parseInt(event.target.value, 10);

    setRowsPerPage(size);

    setPage(0);

    dispatch(
      fetchCategories({
        code,

        name,

        pageNumber: 1,

        pageSize: size,
      }),
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => {
          loadCategories();
        });
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/category/create")}
      >
        Add Category
      </Button>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
        >
          Search
        </Button>

        <Button variant="outlined" startIcon={<Clear />} onClick={handleClear}>
          Clear
        </Button>
      </Stack>

      {loading && <CircularProgress />}

      {error && <p>{error}</p>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>

              <TableCell>Name</TableCell>

              <TableCell>Description</TableCell>

              <TableCell>Active</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.code}</TableCell>

                <TableCell>{category.name}</TableCell>

                <TableCell>{category.description}</TableCell>

                <TableCell>{category.isActive ? "Yes" : "No"}</TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/category/edit/${category.id}`)}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CategoryList;
