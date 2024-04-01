// noinspection JSUnusedGlobalSymbols

import { Dimensions, Image, PixelRatio, Platform, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { EdgeInsets } from 'react-native-safe-area-context';
import { Colors } from '../utils/theme';
import React, { MutableRefObject, RefObject, useRef } from 'react';



const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

let STATUS_BAR_HEIGHT = getStatusBarHeight();



const DEFAULT_HEADER_HEIGHT = 44; 
const DEFAULT_HEADER_STYLE_HEIGHT_FOR_NAVIGATION = DEFAULT_HEADER_HEIGHT + STATUS_BAR_HEIGHT;


const DEFAULT_CHECKBOX_RNEUI_PROPS = {
  iconType: 'font-awesome',
  checkedIcon: 'check-circle',
  uncheckedIcon: 'circle-o',
  size: 16,
  titleProps: {
    style: {
      fontSize: 14,
      lineHeight: 22,
      marginLeft: 4,
      fontFamily: 'PingFang SC',
      color: '#333',
      textAlign: 'left',
    },
  },
  containerStyle: { padding: 0, margin: 0 },
};

const displayUtil = {
  DEFAULT_CHECKBOX_RNEUI_PROPS,
  DEFAULT_INPUT_KEYBOARD_TYPE_ENGLISH,
  DEFAULT_INPUT_KEYBOARD_TYPE_DEFAULT,
  DEFAULT_INPUT_KEYBOARD_TYPE_PASSWORD,
  RANDOM_AVATAR_URL,
  IS_ANDROID,
  IS_IOS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  STATUS_BAR_HEIGHT,
  WINDOW_HEIGHT_WITH_STATUS_BAR,
  PIXEL_RATIO,
  TAB_BAR_HEIGHT: (insets) => {
    return 49 + (insets?.bottom ?? 0) + (displayUtil.IS_ANDROID ? 7 : 0);
  },
  SHOW_LOG: () => {
    console.log('-- [displayUtil] SCREEN_WIDTH', SCREEN_WIDTH);
    console.log('-- [displayUtil] SCREEN_HEIGHT', SCREEN_HEIGHT);
    console.log('-- [displayUtil] WINDOW_WIDTH', WINDOW_WIDTH);
    console.log('-- [displayUtil] WINDOW_HEIGHT', WINDOW_HEIGHT);
    console.log('-- [displayUtil] STATUS_BAR_HEIGHT', STATUS_BAR_HEIGHT);
    console.log('-- [displayUtil] PIXEL_RATIO', PIXEL_RATIO);
  },
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_HEADER_ICON_CONTAINER_STYLE,
  DEFAULT_HEADER_ICON_STYLE,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development', // 检测是否在开发环境中

};

export default displayUtil;
