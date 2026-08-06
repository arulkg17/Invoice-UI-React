import api from '../api/axiosClient';
import type {LoginRequest, LoginResponse} from '../models';

class AuthService {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            "/v1/Login/Login",
            data
        );
        return response.data;
    }
}
export default new AuthService();