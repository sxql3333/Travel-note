import {FlatList,StyleSheet,Text,View,Image,Pressable,Dimensions,Alert} from "react-native";
import React,{useEffect, useState} from "react";
import { Button,Tab,TabView,Icon } from '@rneui/themed';
import { colors, listData } from "../utils/data";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import { getPersonalDiaryApi } from "@/api/getPersonalDiary";
import { savePersonalNotes } from "@/redux/action";
import { deleteDiaryApi } from "@/api/deleteDiary";

const myDiary = () => {
	// const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const personalNotes = useSelector(state => state.personalNotes);

	const [index,setIndex] = useState(0);
  // const [personalDiary, setPersonalDiary] = useState([]);
  useEffect(() => {
    const fetchPersonalNotes = () => {
      getPersonalDiaryApi(userInfo.user._id).then((res) => {
        console.log("根据id获取到的游记", res.data);
        dispatch(savePersonalNotes(res.data)); // 派发action，获取个人笔记
        // setPersonalDiary(res.data);
      });
    };

    // 初始加载一次
    fetchPersonalNotes();

    // 设置定时器，每隔一段时间获取一次数据
    // const intervalId = setInterval(fetchPersonalNotes, 600); // 60000 毫秒即每隔一分钟

    // // 组件卸载时清除定时器
    // return () => clearInterval(intervalId);
  }, [userInfo.user.id]);
	const truncatedTitle = (title) => { 
		return title.length > 20 ? title.substring(0, 20) + '...' : title;
	} 
	const truncatedDescription = (description) => { 
		return description.length > 50 ? description.substring(0, 50) + '...' : description;
	}
  handleDelete = (id) => {
      // 弹出确认删除的对话框
    Alert.alert(
      '确认删除',
      '您确定要删除这篇游记吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            // 调用 deleteDiaryApi 删除游记
            deleteDiaryApi(id)
              .then(() => {
                // 删除成功后，调用 getPersonalDiaryApi 重新获取数据
                getPersonalDiaryApi(userInfo.user._id)
                  .then((res) => {
                    dispatch(savePersonalNotes(res.data));
                  })
                  .catch((error) => {
                    // 处理获取数据失败的情况
                    console.log('重新获取数据失败:', error);
                  });
              })
              .catch((error) => {
                // 处理删除失败的情况
                console.log('删除游记失败:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
    
  };
  function handleViewReason(id, reason) {
    console.log('id', id);
    alert('审核不通过理由: ' + reason);
  };
	
	return (
		<>
			<View style={{paddingHorizontal:16}}>
			<Tab value={index} onChange={setIndex} containerStyle={{backgroundColor:'#fff'}}>
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
                  {/* <Button
                    title={item.is_approved ? '已通过' : '未审核'}
                    color={item.is_approved ? 'green' : 'red'}
                    containerStyle={{ borderRadius: 5 }}
                  /> */}
                  <Button
                    title={item.is_approved === 0 ? '已拒绝' : item.is_approved === 1 ? '已通过' : '待审核'}
                    color={item.is_approved === 0 ? 'red' : item.is_approved === 1 ? 'green' : 'orange'}
                    containerStyle={{ borderRadius: 5 }}
                  />
									<View style={{flexDirection:'row',alignItems:'center'}}>
                  {item.is_approved === 0 && (
                    <Button
                      title="拒绝理由"
                      containerStyle={{ marginRight: 10, borderRadius: 5 }}
                      onPress={() => handleViewReason(item._id,item.reason)}
                    />
                  )}
										<Button title="编辑" containerStyle={ {marginRight:10,borderRadius:5}} />
										<Button title="删除" containerStyle={ {borderRadius:5}} onPress={() => handleDelete(item._id)} />
									</View>
								</View>
								
							</Pressable>
						)}
					/>
					</View>
				</TabView.Item>
				<TabView.Item style={[styles.tabView,{width:Dimensions.get('window').width}]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical:12 }}>
            <View style={{ backgroundColor: "#fff",flex:1,justifyContent: 'center', alignItems: 'center',width:Dimensions.get('window').width-24 }}>
              <Icon name="document-outline" type='ionicon'/>
              <Text>你还没有赞过任何游记哦</Text>
            </View>
            
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