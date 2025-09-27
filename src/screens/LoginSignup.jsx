import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/ThemeProvider'; // Adjust path as needed

const { width, height } = Dimensions.get('window');

export default function LoginSignup({ navigation }) {
  const { theme } = useTheme();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSendOTP = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Please enter your name.');
      return;
    }
    if (phone.trim().length < 10) {
      Alert.alert('Please enter a valid phone number.');
      return;
    }
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      navigation.navigate('OTP', {
        confirmation,
        phone: formattedPhone,
        name,
      });
    } catch (error) {
      Alert.alert(
        'Failed!',
        error.message || 'Could not send OTP, please try again.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[styles.logoCircle, { backgroundColor: theme.colors.accent }]}
      >
        <Text style={[styles.logoText, { color: theme.colors.text }]}>WA</Text>
      </View>
      <Text style={[styles.mainTitle, { color: theme.colors.text }]}>
        Welcome to WhatsApp
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.placeholder }]}>
        Enter your name and phone number to login or sign up
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.input, color: theme.colors.text },
        ]}
        placeholder="Name"
        placeholderTextColor={theme.colors.placeholder}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.input, color: theme.colors.text },
        ]}
        placeholder="Phone Number"
        placeholderTextColor={theme.colors.placeholder}
        keyboardType="phone-pad"
        maxLength={14}
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: theme.colors.accent,
            },
          ]}
          onPress={handleSendOTP}
        >
          <Text
            style={[styles.primaryButtonText, { color: theme.colors.text }]}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleSendOTP}
        >
          <Text
            style={[styles.secondaryButtonText, { color: theme.colors.accent }]}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.07,
  },
  logoCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.06,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: width * 0.05,
  },
  logoText: {
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: width * 0.13,
  },
  mainTitle: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
  input: {
    width: '100%',
    borderRadius: width * 0.035,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.045,
    fontSize: width * 0.048,
    marginBottom: height * 0.025,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: width * 0.035,
    justifyContent: 'space-between',
  },
  primaryButton: {
    borderRadius: width * 0.035,
    flex: 1,
    paddingVertical: width * 0.04,
    alignItems: 'center',
    marginRight: width * 0.018,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: width * 0.035,
    flex: 1,
    paddingVertical: width * 0.04,
    alignItems: 'center',
    marginLeft: width * 0.018,
    borderWidth: 1.5,
  },
  primaryButtonText: {
    fontSize: width * 0.048,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: width * 0.048,
    fontWeight: '600',
  },
});
