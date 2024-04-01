import React, { useState, useRef } from 'react'
import { View, Text,StyleSheet,TextInput } from 'react-native'
import { Input } from "@rneui/themed";
import Addpic from "./components/addpic"

const AddDiary = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const titleInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedText, setIsFocusedText] = useState(false);

    return (
        <View style={{margin:10}}>
            <Addpic/>
            <View style={[styles.inputContainer, {
              marginBottom: 20,
              marginTop: 32,
              borderBottomColor: isFocused ? 'rgba(51, 51, 51, 1)' : 'rgba(0, 0, 0, 0.08)',
            },
          ]}>
            <View style={[styles.inputsubContainer,{height: 35}]}>
              <View style={styles.inputViewStyle}>
            <Input
                ref={titleInputRef}
                value={title}
                multiline={false}
                importantForAutofill={'yes'}
                containerStyle={styles.inputContainerStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid={'transparent'}
                inputStyle={[
                styles.input,
                {
                    letterSpacing: 1 ,
                    backgroundColor: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: title?.length ? 20 : 14,
                    lineHeight: title?.length ? 24 : 16,
                    color: title?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                    textAlign: 'left',
                    borderBottomColor: 'rgba(255,255,255,255)',
                    // fontWeight: '700',
                    paddingVertical: 0,
                },
                ]}
                onChangeText={setTitle}
                placeholder="填写标题会有更多赞哦~"
                placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                onFocus={() =>setIsFocused(true)}
                onBlur={() =>setIsFocused(true)}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.inputContainer, {
              marginBottom: 20,
              marginTop: 32,
              borderBottomColor: isFocusedText ? 'rgba(51, 51, 51, 1)' : 'rgba(0, 0, 0, 0.08)',
            },
          ]}>
            <View style={[styles.inputsubContainer,{height: 135}]}>
              <View style={[styles.inputViewStyle]}>
            <Input
                value={text}
                multiline={true}
                importantForAutofill={'yes'}
                containerStyle={styles.inputContainerStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid={'transparent'}
                inputStyle={[
                styles.input,
                {
                    letterSpacing: 1 ,
                    backgroundColor: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: text?.length ? 20 : 14,
                    lineHeight: text?.length ? 24 : 16,
                    color: text?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                    textAlign: 'left',
                    borderBottomColor: 'rgba(255,255,255,255)',
                    // fontWeight: '700',
                    paddingVertical: 0,
                },
                ]}
                onChangeText={setText}
                placeholder="添加正文"
                placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                onFocus={() =>setIsFocusedText(true)}
                onBlur={() =>setIsFocusedText(true)}
                        />
                    </View>
                </View>
            </View>
            
        </View>
            
       
    );
    
}
const styles = StyleSheet.create({
    inputContainerStyle:{
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
        height: 40,
        flex: 1,
    },
    inputContainer: {
        marginHorizontal:10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 8,
        
      },
      inputsubContainer: {
        position: 'relative',
        padding: 0,
        margin: 0,
        flex: 1,
        
      },
      inputViewStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: -8,
        right: 0,
        top: 0,
        width: '100%',
        bottom: 0,
        zIndex: 0,
        display: 'flex',
      },
    
})
export default AddDiary;