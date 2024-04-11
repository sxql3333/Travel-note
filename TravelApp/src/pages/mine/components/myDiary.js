import {FlatList,StyleSheet,Text,View,Image,Pressable,Dimensions} from "react-native";
import React,{useEffect, useState} from "react";
import { Button,Tab,TabView } from '@rneui/themed';
import { colors, listData } from "../utils/data";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import { getPersonalDiaryApi } from "@/api/getPersonalDiary";
import { savePersonalNotes } from "@/redux/action";

const myDiary = () => {
	// const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const personalNotes = useSelector(state => state.personalNotes);

	const [index,setIndex] = useState(0);
  // const [personalDiary, setPersonalDiary] = useState([]);
  useEffect(() => {
    getPersonalDiaryApi(userInfo.user._id).then((res) => {
      console.log("根据id获取到的游记",res.data);
      dispatch(savePersonalNotes(res.data));   //派发action，获取个人笔记
      // setPersonalDiary(res.data);
    });
  }, [userInfo.user.id]);
	const truncatedTitle = (title) => { 
		return title.length > 20 ? title.substring(0, 20) + '...' : title;
	} 
	const truncatedDescription = (description) => { 
		return description.length > 50 ? description.substring(0, 50) + '...' : description;
	}
	
	return (
		<>
			<View style={{paddingHorizontal:16}}>
			<Tab value={index} onChange={setIndex} >
				<Tab.Item>作品</Tab.Item>
				<Tab.Item>喜欢</Tab.Item>
				</Tab>
				</View>
			<TabView value={index} onChange={setIndex}>
				<TabView.Item style={[styles.tabView,{width:Dimensions.get('window').width}]}>
					<View>
					<FlatList
						// data={listData}
            data={personalNotes}
            keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<Pressable
								// onPress={() => navigation.navigate("RecipeDetail", { item: item })}
                key={item._id} // 添加 key 属性
								style={styles.cardContainer}
							>
								<View style={{flexDirection:'row'}}>
									{/* <Image
										source={item.image}
										style={{ width: '30%', height: 100, resizeMode: "stretch" }}
									/> */}
									<View style={{marginHorizontal:16,flex:1}}>
										<Text  style={styles.title}>{truncatedTitle(item.title)}</Text>
										{/* <Text>{truncatedDescription(item.description)}</Text> */}
                    <Text>{truncatedDescription(item.content)}</Text>
									</View>
								</View>
								
								<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:16,marginHorizontal:6}}>
									{/* <Button title="已通过" color="green"  containerStyle={ {borderRadius:5}}/> */}
                  <Button
                    title={item.is_approved ? '已通过' : '未通过'}
                    color={item.is_approved ? 'green' : 'red'}
                    containerStyle={{ borderRadius: 5 }}
                  />
									<View style={{flexDirection:'row',alignItems:'center'}}>
										<Button title="编辑" containerStyle={ {marginRight:10,borderRadius:5}} />
										<Button title="删除" containerStyle={ {borderRadius:5}} />
									</View>
								</View>
								
							</Pressable>
						)}
						keyExtractor={item => item.id}
					/>
					</View>
				</TabView.Item>
				<TabView.Item style={[styles.tabView,{width:Dimensions.get('window').width}]}>
					<View>
					<Text>喜欢</Text>
					</View>
					
				</TabView.Item>
			</TabView>
		</>
	);
};
const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: colors.COLOR_LIGHT,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 7,
		borderRadius: 16,
		marginVertical: 10,
		paddingHorizontal: 16,
		paddingVertical:8,
		// alignItems: "center",
	},
	title: {
		fontSize: 18,
		color: "#2F6CE0",
		marginBottom: 10
	},
	tabView: {
		paddingHorizontal:16,
	}
});
export default myDiary;