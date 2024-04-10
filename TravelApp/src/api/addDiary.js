import http from '../utils/http';

export const AddDiaryApi = async (images, title, text, userId, userName, is_approved) => {
    console.log("向后端发添加请求")
    try {
        return await http.post('app/addDiary', {
            image: images,
            title: title,
            content: text,
            id: userId,
            name: userName,
            is_approved,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}