import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryThunk";
import type { Category } from "../../models";

interface CategoryState {
  loading: boolean;
  categories: Category[];
  selectedCategory: Category | null;
  totalRecords: number;
  error: string | null;
}

const initialState: CategoryState = {
  loading: false,
  categories: [],
  selectedCategory: null,
  totalRecords: 0,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
        fetchCategories.fulfilled,
        (state, action)=>{
            state.loading=false;
            state.categories=action.payload.data;
            state.totalRecords = action.payload.totalRecords;
        }
    );

    builder.addCase(
        fetchCategories.rejected,
        (state, action) =>{
            state.loading=false;
            state.error = action.payload as string;
        }
    );

    builder.addCase(
        fetchCategoryById.pending,
        (state) =>{
            state.loading=true;
            state.error=null;

        }
    );
    builder.addCase(
        fetchCategoryById.fulfilled,
        (state,action) =>{
            state.loading=false;
            state.selectedCategory = action.payload;    
        }
    );

    builder.addCase(
        fetchCategoryById.rejected,
        (state, action)=>{
            state.loading=false;
            state.error = action.payload as string;
        }
    );

    builder.addCase(
        createCategory.pending,
        (state)=>{
            state.loading=false;
            state.error=null;
        }
    );
    builder.addCase(
        createCategory.fulfilled,
        (state)=>{
            state.loading=false;
        }
    );

    builder.addCase(
        createCategory.rejected,
        (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        }
    );

    builder.addCase(
        updateCategory.pending,
        (state)=>{
            state.loading=false;
            state.error=null;
        }
    );

    builder.addCase(
        updateCategory.fulfilled,
        (state)=>{
            state.loading=false;
        }
    );
    builder.addCase(
        updateCategory.rejected,
        (state,action)=>{
            state.loading=false;
            state.error =  action.payload as string;
        }
    )
    builder.addCase(
        deleteCategory.pending,
        (state)=>{
            state.loading=false;
            state.error=null;
        }
    );
    builder.addCase(
        deleteCategory.fulfilled,
        (state,action)=>{
            state.loading=false;
            state.categories = state.categories.filter(
                c => c.id !== Number(action.payload)
            );
        }
    );
    builder.addCase(
        deleteCategory.rejected,
        (state,action)=>{
            state.loading=false;
            state.error= action.payload as string;
        }
    );
  },
});

export const { clearSelectedCategory} = categorySlice.actions;
export default categorySlice.reducer;
