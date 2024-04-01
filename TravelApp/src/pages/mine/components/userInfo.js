import { StyleSheet, Text, TextInput, View,Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from '@rneui/themed';

const SearchFilter = () => {
	return (
		<View
			style={styles.container}
        >
            <Avatar source={require("../../../assets/avatar1.jpg")} size={40} rounded  avatarStyle={{width:40,height:40}} />
            <Text style={styles.nickname}>举个栗子</Text>
			
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
    },
    nickname: {
        fontSize: 25,
        marginLeft: 8
    }
});
export default SearchFilter;