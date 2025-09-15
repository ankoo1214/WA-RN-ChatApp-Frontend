import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_DARK = '#075E54';

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const { phone, isNew } = route.params || {};

  const handleChange = (text, index) => {
    if (!/^\d*$/.test(text)) return; // Only digits allowed
    let newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Only last digit if pasted more
    setOtp(newOtp);

    // Focus next box if not last and number was entered
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
    // If pasted all 6 digits at once
    if (text.length === 6) {
      let chars = text.split('');
      setOtp(chars.slice(0, 6));
      inputs.current[5].focus();
    }
  };

  // Handle backspace: move focus left if box is empty
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      Alert.alert('Enter the 6-digit OTP!');
      return;
    }
    // Call your verify logic here
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>WA</Text>
      </View>
      <Text style={styles.mainTitle}>Verify your number</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to {phone}
      </Text>
      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={ref => (inputs.current[i] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            autoFocus={i === 0}
            textAlign="center"
            selectionColor={WHATSAPP_GREEN}
            importantForAutofill={i === 0 ? 'yes' : 'no'}
            autoComplete={i === 0 ? 'sms-otp' : 'off'} // Android autofill hint
            accessible={true}
            accessibilityLabel={`OTP Digit ${i + 1}`}
          />
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleVerify}
      >
        <Text style={styles.primaryButtonText}>Verify</Text>
      </Pressable>
      <Text style={styles.helpText}>
        Didn’t receive code?{' '}
        <Text style={{ color: WHATSAPP_GREEN }}>Resend</Text>
      </Text>
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
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
    backgroundColor: WHATSAPP_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: width * 0.09,
  },
  mainTitle: {
    color: '#fff',
    fontSize: width * 0.058,
    fontWeight: 'bold',
    marginBottom: height * 0.017,
  },
  subtitle: {
    color: '#e5e5e5',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: height * 0.037,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,

  },
  otpBox: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    width: width * 0.11,
    // height: width * 0.11,
    fontSize: width * 0.058,
    color: '#222',
    textAlign: 'center',
    marginHorizontal: width * 0.015,
    borderWidth: 2,
    borderColor: WHATSAPP_GREEN,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: WHATSAPP_GREEN,
    borderRadius: width * 0.035,
    width: '60%',
    alignItems: 'center',
    paddingVertical: width * 0.042,
    marginVertical: width * 0.02,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: '600',
  },
  helpText: {
    color: '#e5e5e5',
    fontSize: width * 0.037,
    marginTop: height * 0.015,
  },
});
