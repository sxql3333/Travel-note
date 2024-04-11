import http from '../utils/http';

export const AddDiaryApi = async (
  images,
  title,
  text,
  userId,
  userName,
  is_approved
) => {
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
};
// export const AddDiaryApi = async (formData) => {
//   console.log('请求体内容:', formData); // 打印请求体内容
//   console.log("向后端发添加请求");

//   try {
//     return await http.post('/app/addDiary', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
