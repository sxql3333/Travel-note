import http from '../utils/http';

export const LoginApi = async (name, pwd) => {
    try {
        return await http.post('app/login', {
            username: name,
            password: pwd,
        });
    } catch (error) {
        throw error;
    }
}