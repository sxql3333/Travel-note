import { FlatList,StyleSheet,Text,View,Image,Pressable,DeviceEventEmitter } from "react-native";
import React, { useState, useEffect } from 'react';
import { colors, listData } from "../utils/data";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from '@rneui/themed';
import DiaryDetail from "../../diaryDetails";
const DiaryCard = () => {
	const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (response) => {
    
    console.log('Received search results:', response.data);
    setSearchResults(response.data);
  };

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('searchResults', handleSearchResults);

    return () => {
      subscription.remove();
    };
  }, []);

	return (
		<View>
			<FlatList
        // data={searchResults} // 使用搜索结果数据
				data={listData}
				renderItem={({ item }) => (
					<Pressable
            onPress={() => navigation.navigate("DiaryDetail", { item: item })}
						style={styles.cardContainer}
					>
						{/* <Image
							source={item.image}
							style={{ width: '100%', height: 200, resizeMode: "stretch",borderRadius: 16 }}
						/> */}
						<View style={{paddingHorizontal:5}}>
							<Text  numberOfLines={2} style={ styles.title}>{item.title}</Text>
							<View style={{ flexDirection: "row", marginTop: 8,marginBottom:3,alignItems:'center',justifyContent:'space-between' }}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Avatar size={16} rounded source={item.avatar} />
									<Text style={{ marginLeft: 4 }}>{item.nickname}</Text>
								</View>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Text style={{ color: colors.COLOR_GRAY, marginRight: 4 }}>{item.count}</Text>
									<FontAwesome
										name="heart"
										size={15}
										color={colors.COLOR_PRIMARY}
									/>
								</View>
								
							</View>
						</View>
						
					</Pressable>
				)}
				numColumns={2}
				columnWrapperStyle={{
					justifyContent: "space-between",
				}}
				showsVerticalScrollIndicator={false}
			/>
		</View>
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
		// alignItems: "center",
		width: "48%",
	},
	title: {
		marginTop:10,
	}
});
export default DiaryCard;

