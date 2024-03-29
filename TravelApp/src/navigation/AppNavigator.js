import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login/login";
import DiaryList from "../pages/diaryList/diaryList";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShow: false,headerStyle: { backgroundColor:'pink'} }}
            >
                {/* 页面声明 */}
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="DiaryList" component={DiaryList} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};
export default AppNavigator;