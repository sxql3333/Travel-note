import React, { useState } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

function Loading({ visible }) {
  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

export default Loading;