import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity,Text, View, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiaryList from "./diaryList";
import Mine from "./mine";
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();


const Home = () => {

  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerTitleStyle: {
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'rgba(51, 51, 51, 0.8)',
        headerShown: true,
        tabBarStyle: {
          paddingBottom: insets.bottom + 3,
          paddingTop: 7,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 15,
          marginTop: 3,
          textAlign: 'center',
        },
        tabBarIconStyle: {},
      })}>
      <Tab.Screen
        name="DiaryList"
        component={DiaryList}
        options={({ navigation, route }) => ({
            title: '首页',
            headerShown: true,
            
          tabBarIcon: ({ focused }) => {
            const source = focused
              ? require('../assets/tabs/icon_overview_focus.png')
              : require('../assets/tabs/icon_overview_normal.png');
            return <Image source={source} style={Sizes.tabs} />;
          },
        })}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={({navigation}) => ({
          title: '我',
          headerShown: true,
          tabBarIcon: ({ focused }) => {
            const source = focused
              ? require('../assets/tabs/icon_mine_focus.png')
              : require('../assets/tabs/icon_mine_normal.png');
            return <Image source={source} style={Sizes.tabs} />;
            },
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 16 }}
                  hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                  onPress={() => navigation.navigate('AddDiary')}
                >
                      <View style={styles.add}>
                          <Icon name="plus" type="antdesign" size={15} color={Colors.primary}/>
                          <Text style={styles.addText}>新增</Text>
                      </View>
                  
                </TouchableOpacity>
              ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles= StyleSheet.create({
    add: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    addText: {
        marginLeft: 5,
        color: Colors.primary,
        fontSize:15,
    }
})
export default Home;
