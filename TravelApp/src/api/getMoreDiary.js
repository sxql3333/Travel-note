import http from '@/utils/http';

export const getMoreDiary = async (page, limit) => {
  try {
    console.log("进来");
    return await http.post('app/getMoreDiary', {
      page: page,  //页码
      limit: limit, //每页的长度
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};