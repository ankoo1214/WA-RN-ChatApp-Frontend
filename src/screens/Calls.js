import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export default function Calls() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Recent Calls</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: { fontSize: width * 0.05, color: '#375A60', fontWeight: 'bold' },
});
