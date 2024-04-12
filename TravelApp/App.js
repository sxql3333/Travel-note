import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Loading from "@/components/Loading";

export default function App() {
  const [loading, setLoading] = useState(false);
  return (

    // <AppNavigator />
    <Provider store={store}>
      <Loading visible={loading} />
      <AppNavigator />
    </Provider>
  );
}
