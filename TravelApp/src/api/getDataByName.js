import http from '@/utils/http';

export const getDataByName = async (text) => {
  try {
    // console.log("向后端请求数据", text);
    return await http.post('app/getDataByName', {
      searchText: text,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};