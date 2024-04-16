
import http from '../utils/http';

export const updateInfoApi = async (name, avatar) => {
    try {
        return await http.post('app/updateInfo', {
            username: name,
            avatar: avatar,
        });
    } catch (error) {
        throw error;
    }
}
