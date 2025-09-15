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

const { width, height } = Dimensions.get('window');
const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_DARK = '#075E54';

export default function LoginSignup({ navigation }) {
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
      // Format phone, e.g. +911234567890
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      // Pass name, phone, and confirmation to OTP screen
      console.log('Confirmation Code:>', confirmation);
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>WA</Text>
      </View>
      <Text style={styles.mainTitle}>Welcome to WhatsApp</Text>
      <Text style={styles.subtitle}>
        Enter your name and phone number to login or sign up
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        maxLength={14}
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleSendOTP}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleSendOTP}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHATSAPP_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.07,
  },
  logoCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: WHATSAPP_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.06,
    elevation: 6,
    shadowColor: WHATSAPP_GREEN,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: width * 0.05,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: width * 0.13,
  },
  mainTitle: {
    color: '#fff',
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  subtitle: {
    color: '#e5e5e5',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: width * 0.035,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.045,
    fontSize: width * 0.048,
    color: '#222',
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
    backgroundColor: WHATSAPP_GREEN,
    borderRadius: width * 0.035,
    flex: 1,
    paddingVertical: width * 0.04,
    alignItems: 'center',
    marginRight: width * 0.018,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: width * 0.035,
    flex: 1,
    paddingVertical: width * 0.04,
    alignItems: 'center',
    marginLeft: width * 0.018,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: WHATSAPP_GREEN,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: WHATSAPP_GREEN,
    fontSize: width * 0.048,
    fontWeight: '600',
  },
});
