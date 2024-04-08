import http from '../utils/http';

export const LoginApi = async (name, pwd) => {
    try {
        console.log("我来到try里了");
        const response = await http.post('login', {
          username: name,
          password: pwd, 
      });
      return response;
    } catch (error) {
        console.log("我来到catch里了");
        throw error;
    }
}