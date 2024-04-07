import http from '../utils/http';

export const LoginApi = async (name, pwd) => {
    try {
        return await http.post('login', {
            username: name,
            password: pwd,
            
        });
    } catch (error) {
        throw error;
    }
    
}