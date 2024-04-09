import http from '../utils/http';

export const LoginApi = async (name, pwd) => {
    console.log("向后端发请求")
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