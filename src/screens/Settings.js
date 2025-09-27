import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeProvider'; // Adjust path to your theme context

const { width } = Dimensions.get('window');

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Settings Page
      </Text>

      <Pressable
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: theme.colors.accent }]}
      >
        <Text style={styles.buttonText}>
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.12,
    borderRadius: width * 0.06,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
});
