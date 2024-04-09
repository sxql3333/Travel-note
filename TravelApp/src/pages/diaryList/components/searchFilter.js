import { StyleSheet, Text, TextInput, View, TouchableOpacity,Button, DeviceEventEmitter } from "react-native";
import React, { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { post } from "../../../utils/http";

const SearchFilter = ({ icon, placeholder }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    console.log("进入搜索逻辑");
    //构造请求体并发送请求
    const requestBody = {
      searchText: text
    };
    post('/getDataByName', requestBody)
      .then((response) => {
        // 发送事件，传递响应数据
        console.log("搜索成功");
        DeviceEventEmitter.emit('searchResults', response.data);
      })
      .catch((error) => {
        console.error('搜索请求出错:', error);
      });
    
  };
	return (
		<View
			style={styles.container}
		>
			<FontAwesome name={icon} size={20} color="#f96163" />
			<TextInput 
      style={{ paddingLeft: 8, fontSize: 16, color: "#808080" }} 
      placeholder={placeholder}
      onChangeText={setSearchText}
      value={searchText}
      onSubmitEditing={() => handleSearch(searchText)}
      >
			</TextInput>
      <TouchableOpacity onPress={() => handleSearch(searchText)} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>搜索</Text>
      </TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
    }
});
export default SearchFilter;