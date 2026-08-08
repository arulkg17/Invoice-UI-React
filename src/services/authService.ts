import api from "../api/axiosClient";
import type { LoginRequest, LoginResponse } from "../models";

interface LoginApiResponse {
  success: boolean;
  message: string;
  data: LoginResponse;
  error: string | null;
  timestamp: string;
  totalRecords: number;
}

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginApiResponse>("/v1/Login", data);

    return response.data.data;
  }
}

export default new AuthService();
