import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// WhatsApp official colors
const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_DARK = '#075E54';

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Auto-navigate after splash delay
    const timer = setTimeout(() => {
      navigation.replace('LoginSignUp');
    }, 5000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        {/* Put your logo here. You can use an Image instead of Text for real logo */}
        <Text style={styles.logoText}>WA</Text>
      </View>
      <Text style={styles.appName}>WhatsApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHATSAPP_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: WHATSAPP_GREEN,
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: WHATSAPP_GREEN,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: width * 0.04,
    elevation: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: width * 0.13,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  appName: {
    color: '#fff',
    fontSize: width * 0.08,
    marginTop: 24,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default Splash;
