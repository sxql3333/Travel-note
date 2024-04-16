import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
 
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
 
    if (!result.canceled && result.assets) {
      const base64Images = await Promise.all(
        result.assets.map(async (asset) => {
          const response = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:image/${asset.type};base64,${response}`;
        })
      );
  
      setImages([...images, ...base64Images]);
    } else {
      // console.log('取消选择图片！');
    }
  };
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     multiple: true,
  //   });
  
  //   if (!result.cancelled && result.assets) {
  //     const base64Images = await Promise.all(
  //       result.assets.map(async (asset) => {
  //         const response = await FileSystem.readAsStringAsync(asset.uri, {
  //           encoding: FileSystem.EncodingType.Base64,
  //         });
  //         return `data:image/${asset.type};base64,${response}`;
  //       })
  //     );
  //     setImages([...images, ...base64Images]);
  //     // const selectedImages = result.assets.map((asset) => asset.uri);
  //     // setImages([...images, ...selectedImages]);
      
  //   } else {
  //     // 用户取消选择图片的处理逻辑
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