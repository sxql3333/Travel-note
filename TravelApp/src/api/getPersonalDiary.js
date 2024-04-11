import http from '@/utils/http';

export const getPersonalDiaryApi = async (user_id) => {
  try {
    return await http.post('app/getPersonalDiary', {
      user_id: user_id,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
