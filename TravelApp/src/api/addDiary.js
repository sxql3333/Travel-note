import http from '../utils/http';

export const AddDiaryApi = async (images, title, text,username) => {
    try {
        return await http.post('app/addDiary', {
            image: images,
            title: title,
            content: text,
            name: username,
        });
    } catch (error) {
        throw error;
    }
}