import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import Addpic from './components/add';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../components/Toast';
import { AddDiaryApi } from '@/api/addDiary';
import { useSelector, useDispatch } from 'react-redux';
import { getPersonalDiaryApi } from '@/api/getPersonalDiary';
import { savePersonalNotes } from '@/redux/action';

const AddDiary = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const personalNotes = useSelector((state) => state.personalNotes);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [is_approved, setIs_approved] = useState(2);
  const [is_deleted,setIs_deleted] = useState(1);

  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedText, setIsFocusedText] = useState(false);

  const postNotes = async () => {
    if (images.length === 0) {
      showToast('请添加图片', 330, {
        fontSize: 12,
        fontWeight: '500',
        borderRadius: 8,
        paddingHorizontal: 16,
      });
      return;
    } else if (title.trim() === '') {
      showToast('请添加题目', 330, {
        fontSize: 12,
        fontWeight: '500',
        borderRadius: 8,
        paddingHorizontal: 16,
      });
      titleInputRef.current.focus();
      return;
    } else if (text.trim() === '') {
      showToast('请添加内容', 330, {
        fontSize: 12,
        fontWeight: '500',
        borderRadius: 8,
        paddingHorizontal: 16,
      });
      textInputRef.current.focus();
      return;
    } else {
      try {
        const res = await AddDiaryApi(
          images,
          title,
          text,
          userInfo.user._id,
          userInfo.user.name,
          is_approved,
          is_deleted
        );
        const personalDiaryRes = await getPersonalDiaryApi(userInfo.user._id);
        dispatch(savePersonalNotes(personalDiaryRes.data));
        Navigation.navigate('Mine');
        setImages([]);
        setTitle('');
        setText('');
      } catch {
        console.error(error);
        showToast('添加失败', 330, {
          fontSize: 12,
          fontWeight: '500',
          borderRadius: 8,
          paddingHorizontal: 16,
        });
      }
    }
  };
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Addpic images={images} setImages={setImages} />
        {/* <Addpic/> */}
        <View
          style={[
            styles.inputContainer,
            {
              marginBottom: 20,
              marginTop: 32,
              borderBottomColor: isFocused
                ? 'rgba(51, 51, 51, 1)'
                : 'rgba(0, 0, 0, 0.08)',
            },
          ]}
        >
          <View style={[styles.inputsubContainer, { height: 35 }]}>
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
                    letterSpacing: 1,
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(true)}
              />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              marginBottom: 20,
              marginTop: 32,
              borderBottomColor: isFocusedText
                ? 'rgba(51, 51, 51, 1)'
                : 'rgba(0, 0, 0, 0.08)',
            },
          ]}
        >
          <View style={[styles.inputsubContainer, { height: 135 }]}>
            <View style={[styles.inputViewStyle]}>
              <Input
                ref={textInputRef}
                value={text}
                multiline={true}
                importantForAutofill={'yes'}
                containerStyle={styles.inputContainerStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                underlineColorAndroid={'transparent'}
                inputStyle={[
                  styles.input,
                  {
                    letterSpacing: 1,
                    backgroundColor: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: text?.length ? 20 : 14,
                    lineHeight: text?.length ? 24 : 16,
                    color: text?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                    textAlign: 'left',
                    borderBottomColor: 'rgba(255,255,255,255)',
                    paddingVertical: 0,
                  },
                ]}
                onChangeText={setText}
                placeholder="添加正文"
                placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                onFocus={() => setIsFocusedText(true)}
                onBlur={() => setIsFocusedText(true)}
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        containerStyle={styles.NotesButton}
        title="发布笔记"
        onPress={postNotes}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    height: 40,
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 10,
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
  NotesButton: {
    marginVertical: 12,
    borderRadius: 55,
  },
});
export default AddDiary;
