import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AddContactModal({ visible, onClose, onAdd, theme }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Fallback colors if no theme provided
  const primaryColor = theme?.colors?.accent || '#25D366';
  const backgroundColor = theme?.colors?.background || '#fff';
  const textColor = theme?.colors?.text || '#222';
  const placeholderColor = theme?.colors?.placeholder || '#aaa';
  const inputBackground = theme?.colors?.input || '#f1f1f1';
  const cancelButtonBg = theme?.colors?.card || '#ddd';

  const handleAdd = () => {
    if (!name.trim()) {
      alert('Please enter a name.');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter a phone number.');
      return;
    }
    onAdd({ name, phone });
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.21)' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.modalContent, { backgroundColor }]}>
          <Text style={[styles.title, { color: primaryColor }]}>
            Add Contact
          </Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor={placeholderColor}
            style={[
              styles.input,
              { backgroundColor: inputBackground, color: textColor },
            ]}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={placeholderColor}
            style={[
              styles.input,
              { backgroundColor: inputBackground, color: textColor },
            ]}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={14}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.cancelButton, { backgroundColor: cancelButtonBg }]}
              onPress={() => {
                setName('');
                setPhone('');
                onClose();
              }}
            >
              <Text style={[styles.cancelText, { color: textColor }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[styles.addButton, { backgroundColor: primaryColor }]}
              onPress={handleAdd}
            >
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.87,
    borderRadius: width * 0.06,
    padding: width * 0.07,
    alignItems: 'center',
    elevation: 15,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: width * 0.05,
    letterSpacing: 0.3,
  },
  input: {
    width: '100%',
    borderRadius: width * 0.035,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.045,
    fontSize: width * 0.045,
    marginBottom: width * 0.03,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  cancelButton: {
    borderRadius: width * 0.03,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.07,
    marginRight: width * 0.025,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '500',
    fontSize: width * 0.042,
  },
  addButton: {
    borderRadius: width * 0.03,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.07,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
});
