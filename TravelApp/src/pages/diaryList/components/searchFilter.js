import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  DeviceEventEmitter,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { post } from '@/utils/http';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '@/redux/action';
import { getDataByName } from '@/api/getDataByName';

const SearchFilter = ({ icon, placeholder }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    handleSearch(''); // 首次进入页面发送空搜索请求
  }, []);
  const handleSearch = (text) => {
    // const requestBody = {
    //   searchText: text,
    // };
    // console.log('搜索请求体:', requestBody);
    // post('/app/getDataByName', requestBody)
    //   .then((response) => {
    //     console.log('搜索成功', response.data);
    //     dispatch(setSearchResults(response.data)); // 派发action，更新搜索结果
    //   })
    //   .catch((error) => {
    //     console.error('搜索请求出错:', error);
    //   });
    getDataByName(text).then((res) => {
      dispatch(setSearchResults(res.data));
    })
  };
  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={{ paddingLeft: 8, fontSize: 16, color: '#808080' }}
        placeholder={placeholder}
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={() => handleSearch(searchText)}
      ></TextInput>
      {/* <TouchableOpacity
        onPress={() => handleSearch(searchText)}
        style={styles.searchButton}
      >
        <Text style={styles.searchButtonText}>搜索</Text>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});
export default SearchFilter;
