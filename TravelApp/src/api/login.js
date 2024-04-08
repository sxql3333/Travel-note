import http from '../utils/http';

export const LoginApi = async (name, pwd) => {
    try {
        return await http.post('api/login', {
            username: name,
            password: pwd,
            
        });
    } catch (error) {
        console.log("我来到catch里了");
        throw error;
    }
}