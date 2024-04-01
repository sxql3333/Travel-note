import { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Button, Input, Icon } from '@rneui/themed';
import { Colors } from '../../utils/theme';
import Login from '../login/login';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);
  const handleClearPwd = () => {
    setPassword('');
    passwordInputRef.current?.clear();
  };
  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  }
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const iconName = checked ? 'check-circle' : 'circle';
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.subtitle}>小巷子</Text>
          <Text style={styles.description}>你的旅游指南</Text>
        </View>
        <Input
          value={phone}
          containerStyle={styles.textInput}
          placeholder="手机号"
          editable
          maxLength={11}
          onChangeText={setPhone}
          leftIcon={<Text style={{ fontSize: 20, paddingRight: 2 }}>+86</Text>}
        />

        <Input
          ref={passwordInputRef}
          value={password}
          containerStyle={styles.textInput}
          placeholder="密码"
          editable
          onChangeText={setPassword}
        />
        {password.length > 0 && (
          <TouchableOpacity
            onPress={handleClearPwd}
            style={{ marginRight: 16, paddingBottom: 7 }}
          >
            <Image
              source={require('../../assets/close.png')}
              style={{ width: 14, height: 14 }}
            />
          </TouchableOpacity>
        )}
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={{ color: '#2F6CE0' }}>去登录？</Text>
          </TouchableOpacity>
        </View>

        <Button
          containerStyle={styles.loginButton}
          title="注册"
          onPress={() => navigation.navigate('DiaryList')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleCheckbox();
            }}
            hitSlop={{ left: 12, right: 12 }}
            style={{ paddingRight: 8 }}
          >
            <Icon
              suppressHighlighting={true}
              solid
              name={iconName}
              size={15}
              type={'font-awesome'}
              color={checked ? Colors.primary : 'rgba(255, 255, 255, 0.9)'}
            />
          </TouchableOpacity>

          <Text
            style={{
              marginRight: 2,
              fontSize: 12,
              color: 'rgba(51, 51, 51, 0.6)',
            }}
          >
            我已阅读并同意
          </Text>
          <TouchableOpacity>
            <Text
              style={{ color: Colors.title, fontSize: 12, fontWeight: '700' }}
            >
              服务协议
            </Text>
          </TouchableOpacity>
          <Text style={{ color: Colors.title, fontSize: 12 }}>{'/'}</Text>
          <TouchableOpacity>
            <Text
              style={{ color: Colors.title, fontSize: 12, fontWeight: '700' }}
            >
              隐私协议
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  title: {
    alignItems: 'center',
    marginBottom: 80,
  },
  subtitle: {
    fontSize: 40,
    marginBottom: 10,
    fontWeight: '700',
    color: '#2F6CE0',
  },
  description: {
    fontSize: 17,
    letterSpacing: 4,
  },
  textInput: {
    padding: 0,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButton: {
    marginVertical: 12,
    borderRadius: 55,
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
});
export default Register;
