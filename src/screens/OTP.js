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
import { useTheme } from '../context/ThemeProvider';
const { width, height } = Dimensions.get('window');

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const { theme } = useTheme();
  const { phone, isNew } = route.params || {};

  // Default fallback colors
  const darkMode = theme?.dark ?? true;
  const bgColor = theme?.colors?.background ?? '#075E54';
  const accentColor = theme?.colors?.accent ?? '#25D366';
  const textColor = theme?.colors?.text ?? '#fff';
  const inputBg = theme?.colors?.input ?? '#fff';
  const placeholderColor = theme?.colors?.placeholder ?? '#aaa';

  const handleChange = (text, index) => {
    if (!/^\d*$/.test(text)) return; // Only digits allowed
    let newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Only last digit if pasted more
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (text.length === 6) {
      let chars = text.split('');
      setOtp(chars.slice(0, 6));
      inputs.current[5].focus();
    }
  };

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
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.logoCircle, { backgroundColor: accentColor }]}>
        <Text style={[styles.logoText, { color: textColor }]}>WA</Text>
      </View>
      <Text style={[styles.mainTitle, { color: textColor }]}>
        Verify your number
      </Text>
      <Text style={[styles.subtitle, { color: textColor + 'cc' }]}>
        Enter the 6-digit code sent to {phone}
      </Text>
      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={ref => (inputs.current[i] = ref)}
            style={[
              styles.otpBox,
              {
                backgroundColor: inputBg,
                color: textColor,

                borderColor: accentColor,
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            autoFocus={i === 0}
            textAlign="center"
            selectionColor={accentColor}
            importantForAutofill={i === 0 ? 'yes' : 'no'}
            autoComplete={i === 0 ? 'sms-otp' : 'off'}
            accessible={true}
            accessibilityLabel={`OTP Digit ${i + 1}`}
            placeholder="0"
            placeholderTextColor={placeholderColor}
          />
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          { opacity: pressed ? 0.7 : 1, backgroundColor: accentColor },
        ]}
        onPress={handleVerify}
      >
        <Text style={[styles.primaryButtonText, { color: textColor }]}>
          Verify
        </Text>
      </Pressable>
      <Text style={[styles.helpText, { color: textColor + 'cc' }]}>
        Didn’t receive code? <Text style={{ color: accentColor }}>Resend</Text>
      </Text>
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
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
  },
  logoText: {
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: width * 0.09,
  },
  mainTitle: {
    fontSize: width * 0.058,
    fontWeight: 'bold',
    marginBottom: height * 0.017,
  },
  subtitle: {
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
    borderRadius: width * 0.03,
    width: width * 0.11,
    fontSize: width * 0.058,
    textAlign: 'center',
    marginHorizontal: width * 0.015,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  primaryButton: {
    borderRadius: width * 0.035,
    width: '60%',
    alignItems: 'center',
    paddingVertical: width * 0.042,
    marginVertical: width * 0.02,
  },
  primaryButtonText: {
    fontSize: width * 0.048,
    fontWeight: '600',
  },
  helpText: {
    fontSize: width * 0.037,
    marginTop: height * 0.015,
  },
});
