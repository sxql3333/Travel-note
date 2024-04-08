import { useState,useRef } from 'react';
import { Text, View,  StyleSheet,  TouchableWithoutFeedback, Keyboard,TouchableOpacity,Image } from 'react-native';
import { Button,Input,Icon } from "@rneui/themed";
import { Colors } from '@/utils/theme';

const Login = ({ navigation }) => {
  const [name, setname] = useState("");
  const [pwd, setpwd] = useState("");
  const [repwd, setrepwd] = useState("");
  const pwdInputRef = useRef(null);
  const repwdInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const [isFocusedUser, setIsFocusedUser] = useState(false);
  const [isFocusedpwd, setIsFocusedpwd] = useState(false);
  const [isFocusedrepwd, setIsFocusedrepwd] = useState(false);
  const [watch, setWatch] = useState(false);
  const [rewatch, setreWatch] = useState(false);
  const toggleWatch = () => setWatch(!watch);
  const togglereWatch = () => setreWatch(!rewatch);
  const handleFocus = () => {
    // setPlaceholder('');
    setIsFocusedUser(true);
  };

  const handleBlur = () => {
    setIsFocusedUser(false);
  };
    const handleClearPwd = () => {
        setpwd('');
        pwdInputRef.current?.clear();
  };
  const handleClearrePwd = () => {
    setrepwd('');
    repwdInputRef.current?.clear();
};
  const handleClearText = () => {
    setname('');
    nameInputRef.current?.clear();
  };
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const iconName = checked ? 'check-circle' : 'circle';
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.titleText}>注册</Text>
            </View>
            <View style={[styles.inputContainer, { 
                  marginTop: 32,
                  borderBottomColor: isFocusedUser ? 'rgba(51, 51, 51, 1)' : 'rgba(0, 0, 0, 0.08)',
                },
              ]}>
              
              <View
                style={styles.inputsubContainer}>
                <View
                  style={styles.inputViewStyle}>
                  <Input
                    ref={nameInputRef}
                    value={name}
                    multiline={false}
                    importantForAutofill={'yes'}
                    textContentType={'name'}
                    containerStyle={styles.inputContainerStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    underlineColorAndroid={'transparent'}
                    inputStyle={[
                      styles.input,
                      {
                        letterSpacing: name.length ? 1 : 0,
                        backgroundColor: 'transparent',
                        padding: 0,
                        margin: 0,
                        fontSize: name?.length ? 20 : 14,
                        lineHeight: name?.length ? 24 : 16,
                        color: name?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                        textAlign: 'left',
                        borderBottomColor: 'rgba(255,255,255,255)',
                        // fontWeight: '700',
                        paddingVertical: 0,
                      },
                    ]}
                    onChangeText={setname}
                    placeholder="用户名"
                    placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                    maxLength={ 11}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </View>
              </View>

              {name.length > 0 && isFocusedUser && (
                <TouchableOpacity onPress={handleClearText} style={{ paddingBottom: 7 }}>
                  <Image source={require('../../assets/close.png')} style={{ width: 14, height: 14 }} />
                </TouchableOpacity>
              )}
          </View> 
          <View style={[styles.inputContainer, {
              marginTop: 32,
              borderBottomColor: isFocusedpwd ? 'rgba(51, 51, 51, 1)' : 'rgba(0, 0, 0, 0.08)',
            },
          ]}>
            <View style={styles.inputsubContainer}>
              <View style={styles.inputViewStyle}>
                <Input
                      ref={pwdInputRef}
                      value={pwd}
                      multiline={false}
                      importantForAutofill={'yes'}
                      containerStyle={styles.inputContainerStyle}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      underlineColorAndroid={'transparent'}
                      inputStyle={[
                        styles.input,
                        {
                          letterSpacing: pwd.length ? 1 : 0,
                          backgroundColor: 'transparent',
                          padding: 0,
                          margin: 0,
                          fontSize: pwd?.length ? 20 : 14,
                          lineHeight: pwd?.length ? 24 : 16,
                          color: pwd?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                          textAlign: 'left',
                          borderBottomColor: 'rgba(255,255,255,255)',
                          paddingVertical: 0,
                        },
                  ]}
                      secureTextEntry={!watch}
                      onChangeText={setpwd}
                      placeholder="密码"
                      placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                      onFocus={() => setIsFocusedpwd(true)}
                      onBlur={() => setIsFocusedpwd(false)}
                    />
              </View>
            </View>
            {pwd.length > 0 && isFocusedpwd &&  (
                  <TouchableOpacity onPress={handleClearPwd} style={{  paddingBottom: 7 }}>
                    <Image source={require('../../assets/close.png')} style={{ width: 14, height: 14 }} />
                  </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ paddingBottom: 4 ,paddingLeft:20}}
              hitSlop={{ left: 5, right: 24, top: 12, bottom: 12 }}
              activeOpacity={0.8}
              onPress={toggleWatch}>
          {watch ? (
            <Image source={require('../../assets/eye.png')} style={{ width: 18, height: 18 }} />
          ) : (
            <Image source={require('../../assets/eyeSlash.png')} style={{ width: 18, height: 18 }} />
          )}
          </TouchableOpacity>
            </View>
          <View style={[styles.inputContainer, {
                            marginBottom: 20,
              marginTop: 32,
              borderBottomColor: isFocusedrepwd ? 'rgba(51, 51, 51, 1)' : 'rgba(0, 0, 0, 0.08)',
            },
          ]}>
            <View style={styles.inputsubContainer}>
              <View style={styles.inputViewStyle}>
                <Input
                      ref={repwdInputRef}
                      value={repwd}
                      multiline={false}
                      importantForAutofill={'yes'}
                      containerStyle={styles.inputContainerStyle}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      underlineColorAndroid={'transparent'}
                      inputStyle={[
                        styles.input,
                        {
                          letterSpacing: repwd.length ? 1 : 0,
                          backgroundColor: 'transparent',
                          padding: 0,
                          margin: 0,
                          fontSize: repwd?.length ? 20 : 14,
                          lineHeight: repwd?.length ? 24 : 16,
                          color: repwd?.length ? '#333' : 'rgba(51, 51, 51, 0.5)',
                          textAlign: 'left',
                          borderBottomColor: 'rgba(255,255,255,255)',
                          paddingVertical: 0,
                        },
                  ]}
                      secureTextEntry={!rewatch}
                      onChangeText={setrepwd}
                      placeholder="再次输入密码"
                      placeholderTextColor={'rgba(51, 51, 51, 0.5)'}
                      onFocus={() => setIsFocusedrepwd(true)}
                      onBlur={() => setIsFocusedrepwd(false)}
                    />
              </View>
            </View>
            {repwd.length > 0 && isFocusedrepwd &&  (
                  <TouchableOpacity onPress={handleClearrePwd} style={{  paddingBottom: 7 }}>
                    <Image source={require('../../assets/close.png')} style={{ width: 14, height: 14 }} />
                  </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ paddingBottom: 4 ,paddingLeft:20}}
              hitSlop={{ left: 5, right: 24, top: 12, bottom: 12 }}
              activeOpacity={0.8}
              onPress={togglereWatch}>
          {rewatch ? (
            <Image source={require('../../assets/eye.png')} style={{ width: 18, height: 18 }} />
          ) : (
            <Image source={require('../../assets/eyeSlash.png')} style={{ width: 18, height: 18 }} />
          )}
          </TouchableOpacity>
            </View>

                <Button  containerStyle={styles.loginButton} title="注册" onPress={() => navigation.navigate("DiaryList")} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    marginBottom: 10,
                    marginTop:10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleCheckbox();
                    }}
                    hitSlop={{ left: 12, right: 12 }}
                    style={{ paddingRight: 8 }}>
                    <Icon
                      suppressHighlighting={true}
                      solid
                      name={iconName}
                      size={15}
                      type={'font-awesome'}
                      color={checked ? Colors.primary : 'rgba(255, 255, 255, 0.9)'}
                    />
                   
                  </TouchableOpacity>

                  <Text style={{ marginRight: 2, fontSize: 12, color: 'rgba(51, 51, 51, 0.6)' }}>
                    我已阅读并同意
                  </Text>
                  <TouchableOpacity
                    >
                    <Text style={{ color: Colors.title, fontSize: 12, fontWeight: '700' }}>服务协议</Text>
                  </TouchableOpacity>
                  <Text style={{ color: Colors.title, fontSize: 12 }}>{'/'}</Text>
                  <TouchableOpacity
                    >
                    <Text style={{ color: Colors.title, fontSize: 12, fontWeight: '700' }}>隐私协议</Text>
                  </TouchableOpacity>
          </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal:20,
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
    height: 35,
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
  inputContainerStyle:{
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    height: 40,
    flex: 1,
  },
    title: {
        marginBottom:20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '700',
    },
    subtitle: {
        fontSize: 40,
        marginBottom: 10,
        fontWeight: '700',
        color: '#2F6CE0',
    },
    description: {
        fontSize:17,
        letterSpacing: 4,
    },
    loginButton: {
    marginVertical: 12,
    borderRadius: 55,
  },
  register: {
    alignItems: 'center',
    marginTop:10,
  }, 
  registerText: {
    color: Colors.primary,
    fontSize:15,
  },
    subcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:300,
    },
});
export default Login;