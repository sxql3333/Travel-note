import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  DeviceEventEmitter,
} from 'react-native';
import React, { useState, useEffect} from 'react';
import { colors, listData } from '../utils/data';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import DiaryDetail from '../../diaryDetails';
import { useSelector, useDispatch } from 'react-redux';
import eventBus from '@/utils/EventBus';
import { getMoreDiary } from '@/api/getMoreDiary';
import { setMoreDiary } from '@/redux/action';

const DiaryCard = () => {
  const navigation = useNavigation();
  const searchResults = useSelector((state) => state.searchResults);
  const moreDiary = useSelector((state) => state.moreDiary);
  let [isFresh, setIsFresh] = useState(false);
  const dispatch = useDispatch();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false); // 新增状态用于追踪是否加载了所有数据
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(Number.MAX_SAFE_INTEGER);
  // 首次加载数据
  useEffect(() => {
    loadMoreData(); // 调用 loadMoreData 方法获取第一页数据
  }, []);

  useEffect(() => {
    console.log('moreDiary updated:', moreDiary);
  }, [moreDiary]);
  const loadData = () => {
    setIsFresh(false);
    eventBus.emit('loadData');
  };

  const loadMoreData = () => {
    const page = currentPage + 1; // 获取下一页的页码
    const limit = 4; // 每页显示数量
    if (isAllDataLoaded) return; // 如果已经加载了所有数据，则返回

    getMoreDiary(page, limit).then((res) => {
      const newData = res.data;
      console.log('newData', newData);
      setTotalPages(newData.totalPages)
      console.log('totalPages', totalPages);
      // 设置 totalPages 状态
      setTotalPages(totalPages);
      // 更新 moreDiary 状态
      dispatch(setMoreDiary(res.data.diary));
      // 判断是否加载完成
      if (currentPage >= totalPages) {
        setIsAllDataLoaded(true);
        console.log('加载完成');
      }
      
    });
    setCurrentPage(page); // 更新当前页码的值
  };
  return (
    <View>
      <FlatList
        // data={searchResults} // 使用搜索结果数据
        // data={listData}
        data={moreDiary}  //使用懒加载获取的数据
        refreshing={isFresh}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1} // 可选：设置滚动到底部的阈值（0.1 表示距离底部 10% 的位置时触发）
        onRefresh={() => {
          loadData();
        }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('DiaryDetail', { item: item })}
            key={item._id}
            style={styles.cardContainer}
          >
            <Image
              src={item.image[0]}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'stretch',
                borderRadius: 16,
              }}
            />
            <View style={{ paddingHorizontal: 5 }}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  marginBottom: 3,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Avatar size={16} rounded source={item.avatar} /> */}
                  <Text style={{ marginLeft: 4 }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: colors.COLOR_GRAY, marginRight: 4 }}>
                    {item.count}
                  </Text>
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
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    // alignItems: "center",
    width: '48%',
  },
  title: {
    marginTop: 10,
  },
});
export default DiaryCard;
