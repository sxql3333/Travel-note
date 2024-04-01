import { View, Text,SafeAreaView } from 'react-native'
import SearchFilter from './components/searchFilter'
import DiaryCard from './components/diaryCard'
const DiaryList = () => {
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
            <SearchFilter icon="search" placeholder={"请输入"} />
            <View style={{ marginTop: 10, flex: 1 }}>
				<DiaryCard />
			</View>
        </SafeAreaView>
        
    )
}
export default DiaryList;