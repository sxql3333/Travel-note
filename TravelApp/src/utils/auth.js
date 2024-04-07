import AsyncStorage from '@react-native-async-storage/async-storage';

const UserTokenKey = 'userToken';
const UserRefreshTokenKey = 'userRefreshToken';

// 存储用户登录状态
const setUserToken = async (token, rfToken) => {
  try {
    if (token) {
      await AsyncStorage.setItem(UserTokenKey, token);
    }
    if (rfToken) {
      await AsyncStorage.setItem(UserRefreshTokenKey, rfToken);
    }
  } catch (error) {
    console.error('Error storing user token:', error);
  }
};

// 获取用户登录状态
const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem(UserTokenKey);
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};

// 获取RefreshToken
const getUserRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(UserRefreshTokenKey);
  } catch (error) {
    console.error('Error getting user refreshoken:', error);
    return null;
  }
};

/** 格式化token（jwt格式） */
const formatToken = (token)=> {
  return 'Bearer ' + token;
};

// 清除用户登录状态
const clearUserToken = async () => {
  try {
    await AsyncStorage.removeItem(UserTokenKey);
    await AsyncStorage.removeItem(UserRefreshTokenKey);
  } catch (error) {
    console.error('Error clearing user token:', error);
  }
};

const checkTokenValidity = () => {
  return true;
};

export { setUserToken, getUserToken, clearUserToken, formatToken, checkTokenValidity, getUserRefreshToken };
