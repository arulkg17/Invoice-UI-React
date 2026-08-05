import api from '../api/axios';
import type {LoginRequest, LoginResponse} from '../models';

class AuthService {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            "http://localhost:5269/api/v1/Login/Login",
            data
        );
        return response.data;
    }
}
export default new AuthService();