import axios from 'axios';

export class LoginService {
    static async login(username, password) {
        return axios.post('/authenticate', { username, password });
    }
}