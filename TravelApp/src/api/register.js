import http from '../utils/http';

export const RegisterApi = async (name, pwd) => {
    try {
        return await http.post('app/register', {
            username: name,
            password: pwd,
        });
    } catch (error) {
        throw error;
    }
}