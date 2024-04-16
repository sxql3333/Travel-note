
import { useState } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { updatePasswordApi } from "@/api/updatePwd";
import { showToast } from "@/components/Toast";
const EditPassword = ({ route }) => {
    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const { name } = route.params;
    const onSave = async () => {
        try {
            const res = await updatePasswordApi(name, pwd, newPwd);
            console.log("res", res);
            if(res.code === 200){
                showToast("修改成功", 530);
            } else {
                showToast(res.message, 330);
            }
        }catch (error) {
            showToast(error?.message || "网络错误", 330, {
            });
        }
        
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            
            <View >
                <View style={styles.inputStyle}>
                    <Text>原密码</Text>
                    <TextInput value={pwd} onChangeText={(text) => setPwd(text)}></TextInput>
                </View>
                <View style={styles.inputStyle}>
                    <Text>新密码</Text>
                    <TextInput value={newPwd} onChangeText={(text) => setNewPwd(text)}></TextInput>
                </View>
            </View>
            <View>
                <Button
                    buttonStyle={{ marginTop: 40,borderRadius:30 }}
                    title="确认修改"
                    onPress={onSave}
                />
            </View>
            
            
        </View>
    </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    cameraContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:40,
    },
    avatarStyle: {
        width: 70,
        height: 55,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        marginTop: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingBottom: 15
    }
})
export default EditPassword;
