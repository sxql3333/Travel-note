import http from '../utils/http';

export const updatePasswordApi = async (name, pwd,newPwd) => {
    try {
        return await http.post('app/updatePwd', {
            username: name,
            password: pwd,
            newPassword: newPwd,
        });
    } catch (error) {
        throw error;
    }
}
