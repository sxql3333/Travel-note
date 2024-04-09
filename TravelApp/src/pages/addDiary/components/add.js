import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
 
const Add = ({ images, setImages }) => {
  // const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      // 请求权限
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('拒绝访问图片库权限！');
      }
    })();
  }, []);
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });
 
    // console.log(result);
 
    if (!result.cancelled && result.assets) {
      // 设置选择的图片
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
      console.log(images);
      // 上传图片的逻辑
      // uploadImage(result.assets[0].uri);
     
    } else {
      // console.log('取消选择图片！');
    }
  };
 
  // const uploadImage = async (uri) => {
  //   // 创建FormData对象
  //   const formData = new FormData();
  //   formData.append('image', { uri, name: 'image.jpg', type: 'image/jpeg' });
 
  //   try {
  //     const response = await fetch('https://your-api-endpoint', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
 
  //     if (response.status === 200) {
  //       console.log('图片上传成功');
  //     } else {
  //       console.log('图片上传失败');
  //     }
  //   } catch (error) {
  //     console.log('上传图片时出错', error);
  //   }
  // };

  return (
    <View >
      <View style={styles.container}>
        <ScrollView horizontal={true}>
        {images &&images?.map((uri, index) => (
          <Image key={index} source={{ uri: uri }} style={styles.imageStyle} resizeMode="contain"/>
        ))}
          <TouchableOpacity onPress={pickImage}>
            <Icon style={{ marginLeft: 5 }} name="add-box" size={180} color="#d3d3d3"  />
          </TouchableOpacity>
        </ScrollView>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 180,
    height: 180,
    // marginTop: 20
  }
})
export default Add;