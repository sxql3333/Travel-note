import { useState, useEffect } from "react";
import { TouchableOpacity, Keyboard, View, Text, TouchableWithoutFeedback, StyleSheet,TextInput } from "react-native";
import { Icon,Avatar,Button } from "@rneui/themed";
import { useSelector } from 'react-redux';
import { showToast } from '@/components/Toast';
import * as ImagePicker from 'expo-image-picker';
import { updateInfoApi } from "@/api/updateInfo";
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '../../redux/action';

const EditInfo = ({navigation}) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    let [images, setImages] = useState(null);
    const [form, setForm] = useState({
        name: userInfo?.user?.name || '', 
        gender: userInfo?.user?.gender || '女', 
        age: userInfo?.user?.age || '25岁', 
        region: userInfo?.user?.region || '云南省大理白族自治州', 
      });
    useEffect(() => {
        if (userInfo?.user?.avatar) {
          setImages(userInfo.user.avatar);
        }
      }, [userInfo]); 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.image,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          multiple: true,
        });
        if (!result.canceled && result.assets) {
          console.log("222222222", result.assets[0].uri);
          
          setImages(result.assets[0].uri);
        } else {
          console.log('取消选择图片！');
        }
    };
    const onSave = async () => {
        try {
            const res = await updateInfoApi(form.name, images);
            if (res.code === 200) {
                showToast("修改成功", 330);
                dispatch(saveUserInfo(res.data.user));
                navigation.goBack();
            } else {
                showToast(res.message, 330);
            }
        }catch (error) {
            showToast(error?.message || "网络错误", 330, {
            });
        }
    };
    const handleInputChange = (key, value) => {
        setForm({
          ...form,
          [key]: value,
        });
      };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <TouchableOpacity  onPress={pickImage}>           
                    <Avatar
                        source={images ? { uri: images } : require('@/assets/avatar1.jpg')}
                        size={70}
                        rounded
                        avatarStyle={{ width: 70, height: 70 }}
                        />
                    </TouchableOpacity>
                </View>
                <View v-model="form">
                    <View style={styles.inputStyle}>
                        <Text>用户名</Text>
                        <TextInput value={form.name} onChangeText={(text) => handleInputChange('name', text)}></TextInput>
                    </View>
                    <View style={styles.inputStyle}>
                        <Text>性别</Text>
                        <TextInput value={form.gender} onChangeText={(text) => handleInputChange('gender', text)}></TextInput>
                    </View>
                    <View style={styles.inputStyle}>
                        <Text>年龄</Text>
                        <TextInput value={form.age} onChangeText={(text) => handleInputChange('age', text)} ></TextInput>
                    </View>
                    <View style={styles.inputStyle}>
                        <Text>地区</Text>
                        <TextInput value={form.region} onChangeText={(text) => handleInputChange('region', text)}></TextInput>
                    </View>
                </View>
                <View>
                    <Button
                        buttonStyle={{ marginTop: 40,borderRadius:30 }}
                        title="保存"
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
export default EditInfo; 