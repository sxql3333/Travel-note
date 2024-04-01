import { View, Text,SafeAreaView } from 'react-native'
import UserInfo from './components/userInfo'
import MyDiary from './components/myDiary'

const Mine = () => {
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
            <UserInfo icon="search" placeholder={"请输入"} />
            <View style={{ marginTop: 10, flex: 1 }}>
				<MyDiary />
			</View>
        </SafeAreaView>
        
    )
}
export default Mine;