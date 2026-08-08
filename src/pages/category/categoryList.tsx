import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { Edit, Delete, Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  fetchCategories,
  deleteCategory,
} from "../../redux/category/categoryThunk";

import SnackbarAlert from "../../components/common/SnackbarAlert";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Header from "../../layout/Header";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    categories,
    loading,
    error,
    totalRecords,
  } = useAppSelector((state) => state.category);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as
      | "success"
      | "error"
      | "info"
      | "warning",
  });

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<any>(null);

  /*
   * Load categories
   */
  const loadCategories = () => {
    dispatch(
      fetchCategories({
        code,
        name,
        pageNumber: page + 1,
        pageSize: rowsPerPage,
      })
    );
  };

  /*
   * Initial load
   */
  useEffect(() => {
    loadCategories();
  }, []);

  /*
   * Show "No records found" only after loading
   * has completed and the API returned zero records.
   */
  useEffect(() => {
    if (!loading && totalRecords === 0) {
      setSnackbar({
        open: true,
        message: "No records found",
        severity: "info",
      });
    }
  }, [loading, totalRecords]);

  /*
   * Search
   */
  const handleSearch = () => {
    setPage(0);

    dispatch(
      fetchCategories({
        code,
        name,
        pageNumber: 1,
        pageSize: rowsPerPage,
      })
    );
  };

  /*
   * Clear search
   */
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
      })
    );
  };

  /*
   * Page change
   */
  const handleChangePage = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);

    dispatch(
      fetchCategories({
        code,
        name,
        pageNumber: newPage + 1,
        pageSize: rowsPerPage,
      })
    );
  };

  /*
   * Rows per page change
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
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
      })
    );
  };

  /*
   * Delete button
   */
  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  /*
   * Confirm delete
   */
  const confirmDelete = () => {
    if (!selectedCategory) {
      return;
    }

    dispatch(deleteCategory(selectedCategory.id))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Category deleted successfully",
          severity: "success",
        });

        loadCategories();
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Unable to delete category",
          severity: "error",
        });
      });

    setDeleteOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "primary.main",
        }}
      >
        Category List
      </Typography>

      {/* Add Category */}
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/category/create")}
      >
        Add Category
      </Button>

      {/* Search Area */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
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

        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={handleClear}
        >
          Clear
        </Button>
      </Stack>

      {/* Loading */}
      {loading && (
        <Stack
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <CircularProgress />
        </Stack>
      )}

      {/* Error */}
      {error && (
        <Typography
          color="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}

      {/* Category Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
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
                <TableCell>
                  {category.code}
                </TableCell>

                <TableCell>
                  {category.name}
                </TableCell>

                <TableCell>
                  {category.description}
                </TableCell>

                <TableCell>
                  {category.isActive ? "Yes" : "No"}
                </TableCell>

                <TableCell>
                  {/* Edit */}
                  <IconButton
                    onClick={() =>
                      navigate(
                        `/category/edit/${category.id}`
                      )
                    }
                  >
                    <Edit />
                  </IconButton>

                  {/* Delete */}
                  <IconButton
                    onClick={() =>
                      handleDeleteClick(category)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={
          handleChangeRowsPerPage
        }
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Snackbar */}
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        title="Delete Category"
        itemName={
          selectedCategory?.name ?? ""
        }
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={confirmDelete}
      />
       <Header />
    </Paper>
  );
};

export default CategoryList;

