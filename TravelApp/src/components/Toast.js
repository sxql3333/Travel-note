import { Alert,  Platform, TextStyle, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';

const windowHeight = Dimensions.get('window').height;

let toast;
const showToast = (
  content,
  position = -windowHeight / 7,
  style= {},
  onHide = () => {},
) => {
    if (!content?.length) {
      console.log("content is empty");
    return;
  }
  const {
    backgroundColor = 'black',
    color = 'white',
    opacity = 0.7,
    width,
    height,
    borderRadius = 7,
    fontSize,
  } = style;
  if (toast) {  
      Toast.hide(toast);
  }
  toast = Toast.show(content, {
    duration: Toast.durations.SHORT,
    containerStyle: {
      width: width,
      height: height,
      borderRadius: borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    position: position,
    shadow: false,
    animation: true,
    hideOnPress: true,
    opacity: opacity ,
    backgroundColor: backgroundColor ,
    textColor: color,
    textStyle: {
      fontSize: fontSize,
      padding: 5,
      textAlignVertical: 'center',
    },
    delay: 300,
    onHide: onHide,
  });
};

export {  showToast };
