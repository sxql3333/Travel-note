import { StyleSheet, Text, View } from "react-native";
import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import DiaryList from "../pages/diaryList";
import Home from "../pages/home";
import Mine from "../pages/mine";
import AddDiary from "../pages/addDiary";
import DiaryDetail from "../pages/diaryDetails";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShow: false,headerStyle: { backgroundColor:'#fff'} }}
            >
                {/* 页面声明 */}
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Mine" component={Mine} />
                <Stack.Screen name="DiaryList" component={DiaryList} />
                <Stack.Screen name="AddDiary" component={AddDiary} />
                <Stack.Screen name="DiaryDetail" component={DiaryDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

};
export default AppNavigator;