import React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const navigateResetTo = (pageName, params = {}) => {
  const navigation = navigationRef.current;
  if (navigation?.isReady()) {
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: pageName, params: params }] }));
  }
};

/**
 * 经过测试, Home页面会重新渲染
 */
export const navigateResetToHome = () => {
  navigateResetTo('Home');
};

/**
 * 返回上一页携带参数, 不需要传递 screen name
 *
 * react-native-navigation 6.x
 * https://stackoverflow.com/a/77443164/4348530
 * https://reactnavigation.org/docs/navigation-actions/
 * https://stackoverflow.com/a/76581949/4348530
 * @param params
 */
export const goBack = params => {
  const navigation = navigationRef.current;
  if (navigation?.isReady()) {
    if (!params) {
      navigation.goBack();
    } else {
      navigation.dispatch(state => {
        if (state.routes.length >= 2) {
          const prevRoute = state.routes[state.routes.length - 2];
          return CommonActions.navigate({
            name: prevRoute.name,
            params: params,
            merge: true,
          });
        } else {
          return CommonActions.goBack();
        }
      });
    }
  }
};
