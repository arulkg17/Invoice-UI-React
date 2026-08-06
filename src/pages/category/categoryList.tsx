import { useEffect } from "react";

import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCategories,
  deleteCategory,
} from "../../redux/category/categoryThunk";

const CategoryList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { categories, loading, error } = useAppSelector(
    (state) => state.category,
  );

  useEffect(() => {
    dispatch(
      fetchCategories({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => {
          dispatch(
            fetchCategories({
              pageNumber: 1,
              pageSize: 10,
            }),
          );
        });
    }
  };

  return (
    <Paper
      sx={{
        padding: 3,
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/category/create")}
        sx={{
          mb: 2,
        }}
      >
        Add Category
      </Button>

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
    </Paper>
  );
};

export default CategoryList;
