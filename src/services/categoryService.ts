import api from "../api/axiosClient";
import type { ApiResponse, Category } from "../models";

class CategoryService {
  async getAllPaged(
    code?: string,
    name?: string,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<ApiResponse<Category[]>> {
    const response = await api.get<ApiResponse<Category[]>>(
      "/v1/Category/GetAllPaged",
      {
        params: {
          code,
          name,
          pageNumber,
          pageSize,
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
