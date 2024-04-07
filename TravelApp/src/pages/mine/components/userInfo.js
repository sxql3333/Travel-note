import { StyleSheet, Text, TextInput, View,Image } from "react-native";
import React from "react";
import { Button} from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from '@rneui/themed';

const SearchFilter = () => {
    return (
		<View
			style={styles.container}
        >
            <Avatar source={require("../../../assets/avatar1.jpg")} size={40} rounded  avatarStyle={{width:40,height:40}} />
            <Text style={styles.nickname}>举个栗子</Text>
			<View style={{flexDirection: "row",alignItems: "center",marginBottom: 5}}>
                <Text style={styles.number}>85</Text ><Text style={styles.text}>获赞</Text>
                <Text style={styles.number}>5</Text><Text style={styles.text}>关注</Text>
                <Text style={styles.number}>2</Text><Text style={styles.text}>粉丝</Text>
            </View>
            <View style={{flexDirection: "row",alignItems: "center",marginBottom:8}}>
                <Button disabled size={"sm"} disabledTitleStyle={{ fontSize: 12 }} containerStyle={{marginRight: 8}}  style={styles.text}>25岁</Button>
                <Button disabled  size={"sm"} disabledTitleStyle={{ fontSize: 12 }} style={styles.text}>云南省大理白族自治州</Button>
                
            </View>
            <View style={{flexDirection: "row",alignContent: "center"}}>
                <Button  buttonStyle={{backgroundColor: "rgba(0, 0, 0, 0.2)",borderRadius: 8}} titleStyle={{color:"#000",fontSize:14}} containerStyle={{marginRight: 16}}>编辑资料</Button>
                <Button buttonStyle={{backgroundColor: "rgba(0, 0, 0, 0.2)",borderRadius: 8}} titleStyle={{color:"#000",fontSize:14}}>密码设置</Button>
            </View>
        </View>
	);
};
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        // flexDirection: "row",
        // alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        marginHorizontal: 16,
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
    },
    number: {
        fontSize: 14,
        marginRight: 4
    },
    text: {
        fontSize: 14,
        marginRight: 8,
        color: "#999"
    },
    

});
export default SearchFilter;