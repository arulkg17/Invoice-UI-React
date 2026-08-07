import api from "../api/axiosClient";
import type { ApiResponse, Category, CategoryFilter } from "../models";

class CategoryService {
  async getAllPaged(
    filter:CategoryFilter
  ): Promise<ApiResponse<Category[]>> {
    const response = await api.get<ApiResponse<Category[]>>(
      "/v1/Category/GetAllPaged",
      {
        params: {
          code:filter.code,
          name:filter.name,
          pageNumber:filter.pageNumber,
          pageSize:filter.pageSize,
        },
      },
    );
    return response.data;
  }

  async getById(id: number): Promise<ApiResponse<Category>> {
    const response = await api.get<ApiResponse<Category>>(
      `/v1/Category/GetById/${id}`,
    );
    return response.data;
  }

  async create(category: Category): Promise<ApiResponse<number>> {
    const response = await api.post("/v1/Category/Create", category);
    return response.data;
  }

  async update(id: number, category: Category): Promise<ApiResponse<string>> {
    const response = await api.put<ApiResponse<string>>(
      `/v1/Category/Update/${id}`,
      category,
    );
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<string>> {
    const response = await api.delete<ApiResponse<string>>(
      `/v1/Category/Delete/${id}`,
    );
    return response.data;
  }
}
export default new CategoryService();
