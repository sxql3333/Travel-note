import http from '../utils/http';

export const RegisterApi = async (name, pwd,Avatar) => {
    try {
        return await http.post('app/register', {
            username: name,
            password: pwd,
            avatar:Avatar
        });
    } catch (error) {
        throw error;
    }
}