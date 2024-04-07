import React from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from "@react-navigation/native";
const NewMsgBac = () => {
    const navigation = useNavigation();
    const goToPage = (pageName, param) => {
        if (param) {
            navigation.navigate(pageName, param);
        }
        navigation.navigate(pageName);
    };
    const openPhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        }).catch(error => {
            console.log(error);
        });
    };

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                <TouchableOpacity onPress={goToPage('ChoiceImgLocal')}>
                    <View style={[Styles.itemView, { marginTop: 10 }]}>
                        <Text style={Styles.itemText}>选择背景图</Text>
                        <Icon style={{ marginLeft: 5 }} name="angle-right" size={25} color="#BBB" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ openPhoto()}>
                    <View style={[Styles.itemView, { marginTop: 10 }]}>
                        <Text style={Styles.itemText}>从手机相册选择</Text>
                        <Icon style={{ marginLeft: 5 }} name="angle-right" size={25} color="#BBB" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToPage('ChoiceImgCamera')}>
                    <View style={[Styles.itemView]}>
                        <Text style={Styles.itemText}>拍一张</Text>
                        <Icon style={{ marginLeft: 5 }} name="angle-right" size={25} color="#BBB" />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    
};
 
const Styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        backgroundColor: '#FFF',
    },
    itemText: {
        flex:1,
        flexWrap: "wrap-reverse",
        fontSize: 15,
        color:'#333'
    },
});

export default NewMsgBac;