import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from '../../services/categoryService';
import type { Category } from '../../models';

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (
        params: {
            code?:string,
            name?:string,
            pageNumber?:number,
            pageSize?:number
        },
        { rejectWithValue }
    ) =>{
        try{
            const response = await categoryService.getAllPaged(
                params.code,
                params.name,
                params.pageNumber,
                params.pageSize
            );
            if(!response.success)
            {
                return rejectWithValue(response.message);
            }
            return response;
        }
        catch(error:any)
        {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }

    }
);

export const fetchCategoryById = createAsyncThunk(
    "category/fetchCategoryById",
    async (
        id:number,
        {rejectWithValue}
    ) =>{
        try{
            const response = await categoryService.getById(
                id
            );
            if(!response.success)
            {
                return rejectWithValue(response.message);
            }
            return response.data;
        }
        catch(error:any)
        {
            return rejectWithValue(
                error.response?.data?.message || 
                error.message
            );
        }
    }
);

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (
        category:Category,
        { rejectWithValue}
    ) =>{
        try{
            const response = await categoryService.create(category);
            if(!response.success)
            {
                return rejectWithValue(response.message);
            }
            return response;
        }
        catch(error:any)
        {
            return rejectWithValue(
                error.response?.data?.message || 
                error.message
            );
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (
        {
            id,
            category
        } : {
            id:number,
            category:Category
        },
        { rejectWithValue}
    ) =>{
        try {
            const response = await categoryService.update(id,category);
            if(!response.success)
            {
                return rejectWithValue(response.message);
            }
            return response.data;
        }
        catch(error:any){
            return rejectWithValue(
                error.response?.data?.message || 
                error.message
            );
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (
        id:number,
        { rejectWithValue}
    ) => {
        try{
            const response = await categoryService.delete(id);
            if(!response.success)
            {
                return rejectWithValue(response.message);
            }
            return response.data;
        }
        catch(error:any)
        {
            return rejectWithValue(
                error.response?.data?.message || 
                error.message
            );
        }
    }

);



