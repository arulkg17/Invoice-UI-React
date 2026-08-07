import {
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createCategory,
  updateCategory,
  fetchCategoryById,
} from "../../redux/category/categoryThunk";
import { clearSelectedCategory } from "../../redux/category/categorySlice";
import type { Category } from "../../models";
import SnackbarAlert from "../../components/common/SnackbarAlert";

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedCategory } = useAppSelector((state) => state.category);
  const [errors, setErrors] = useState<any>({});
  const [category, setCategory] = useState<Category>({
    id: 0,
    code: "",
    name: "",
    description: "",
    isActive: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(Number(id)));
    } else {
      // Add mode
      dispatch(clearSelectedCategory());
      setCategory({
        id: 0,
        code: "",
        name: "",
        description: "",
        isActive: true,
      });
      setErrors({});
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,

      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let temp: any = {};

    if (!category.code) {
      temp.code = "Code is required";
    } else if (category.code.length > 5) {
      temp.code = "Code can not exceed 5 characters";
    }

    if (!category.name) {
      temp.name = "Name is required";
    } else if (category.name.length > 25) {
      temp.name = "Name can not exceed 25 characters";
    }
    if (category.description && category.description.length > 100) {
      temp.description = "Description can not exceed 100 charaacters";
    }
    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    if (id) {
      dispatch(updateCategory(category))
        .unwrap()
        .then(() => {
          setSnackbar({
            open: true,
            message: "Category updated successfully",
            severity: "success",
          });

          setTimeout(() => {
            navigate("/category");
          }, 1500);
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Unable to update category",
            severity: "error",
          });
        });
    } else {
      dispatch(createCategory(category))
        .unwrap()
        .then(() => {
          setSnackbar({
            open: true,
            message: "Category created successfully",
            severity: "success",
          });

          setTimeout(() => {
            navigate("/category");
          }, 1500);
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Unable to create category",
            severity: "error",
          });
        });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <TextField
        fullWidth
        label="Code"
        name="code"
        value={category.code}
        onChange={handleChange}
        onFocus={handleFocus}
        error={!!errors.code}
        helperText={errors.code}
        slotProps={{
          htmlInput: {
            maxLength: 5,
          },
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={category.name}
        onChange={handleChange}
        onFocus={handleFocus}
        error={!!errors.name}
        helperText={errors.name}
        slotProps={{
          htmlInput: {
            maxLength: 25,
          },
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={category.description ?? ""}
        onChange={handleChange}
        onFocus={handleFocus}
        error={!!errors.description}
        helperText={errors.description}
        slotProps={{
          htmlInput: {
            maxLength: 100,
          },
        }}
        sx={{ mb: 2 }}
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
      <br />

      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>

      <Button
        sx={{ ml: 2 }}
        variant="outlined"
        onClick={() => navigate("/category")}
      >
        Cancel
      </Button>
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
    </Paper>
  );
};

export default CategoryForm;
