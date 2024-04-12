import http from '../utils/http';

export const deleteDiaryApi = async (id) => {
  try {
    return await http.post('/deleteDiary', {
      id: id,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
