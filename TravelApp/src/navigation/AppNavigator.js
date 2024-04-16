import { StyleSheet, Text, View } from "react-native";
import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login/index";
import Register from "../pages/register/index";
import DiaryList from "../pages/diaryList";
import Home from "../pages/home";
import Mine from "../pages/mine";
import AddDiary from "../pages/addDiary";
import DiaryDetail from "../pages/diaryDetails";
import EditInfo from "../pages/editInfo";
import EditPassword from "../pages/editPassword";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShow: false, headerStyle: { backgroundColor: '#fff' } }}
            >
                {/* 页面声明 */}
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ title: '注册'  }}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Mine" component={Mine} />
                <Stack.Screen name="DiaryList" component={DiaryList} />
                <Stack.Screen name="AddDiary" component={AddDiary} />
                <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
                <Stack.Screen name="EditInfo" component={EditInfo} options={{ title: '编辑资料' }} />
                <Stack.Screen name="EditPassword" component={EditPassword} options={{ title: '修改密码' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};
export default AppNavigator;