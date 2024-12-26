export class ApiService {
    static setToken(token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static removeToken() {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }
}