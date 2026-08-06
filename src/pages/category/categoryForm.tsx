import {
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  createCategory,
  updateCategory,
  fetchCategoryById,
} from "../../redux/category/categoryThunk";

import type { Category } from "../../models";

const CategoryForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { selectedCategory } = useAppSelector((state) => state.category);

  const [category, setCategory] = useState<Category>({
    id: 0,

    code: "",

    name: "",

    description: "",

    isActive: true,
  });

  // Load existing category for Edit

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(Number(id)));
    }
  }, [id, dispatch]);

  // Populate form after API response

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (id) {
      await dispatch(
        updateCategory({
          id: Number(id),

          category,
        }),
      );
    } else {
      await dispatch(createCategory(category));
    }

    navigate("/category");
  };

  return (
    <Paper
      sx={{
        padding: 3,
      }}
    >
      <TextField
        fullWidth
        label="Code"
        name="code"
        value={category.code}
        onChange={handleChange}
        sx={{
          mb: 2,
        }}
      />

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={category.name}
        onChange={handleChange}
        sx={{
          mb: 2,
        }}
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={category.description ?? ""}
        onChange={handleChange}
        sx={{
          mb: 2,
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={category.isActive ?? false}
            onChange={(e) =>
              setCategory({
                ...category,

                isActive: e.target.checked,
              })
            }
          />
        }
        label="Active"
      />

      <br />

      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>

      <Button
        variant="outlined"
        sx={{
          ml: 2,
        }}
        onClick={() => navigate("/category")}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default CategoryForm;
