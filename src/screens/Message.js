import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeProvider'; // Adjust the import path

const { width } = Dimensions.get('window');

export default function MessageScreen({ route }) {
  const { chatId, chatName, avatar } = route.params;
  const { theme } = useTheme();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! How are you?', sender: 'them', time: '09:32' },
    { id: '2', text: 'Nice! See you soon.', sender: 'me', time: '09:40' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      { id: Date.now().toString(), text: input, sender: 'me', time: 'Now' },
      ...messages,
    ]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        {
          justifyContent: item.sender === 'me' ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor:
              item.sender === 'me'
                ? theme.colors.accent
                : theme.colors.background,
            borderTopRightRadius:
              item.sender === 'me' ? width * 0.04 : width * 0.02,
            borderTopLeftRadius:
              item.sender !== 'me' ? width * 0.04 : width * 0.02,
            borderBottomRightRadius: width * 0.04,
            borderBottomLeftRadius: width * 0.04,
            borderColor:
              item.sender === 'me'
                ? theme.colors.accent
                : theme.colors.separator,
            borderWidth: item.sender === 'me' ? 0 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: item.sender === 'me' ? '#fff' : theme.colors.text },
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timeText,
            {
              color:
                item.sender === 'me'
                  ? 'rgba(255,255,255,0.7)'
                  : theme.colors.placeholder,
            },
          ]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.accent }]}>
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.avatarText, { color: theme.colors.accent }]}>
            {avatar}
          </Text>
        </View>
        <Text style={[styles.chatName, { color: theme.colors.background }]}>
          {chatName}
        </Text>
      </View>
      {/* Messages */}
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: width * 0.03 }}
        inverted
      />
      {/* Input */}
      <View
        style={[
          styles.inputRow,
          {
            borderTopColor: theme.colors.separator,
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor={theme.colors.placeholder}
          style={[
            styles.input,
            { color: theme.colors.text, backgroundColor: theme.colors.input },
          ]}
        />
        <Pressable
          onPress={sendMessage}
          style={[styles.sendButton, { backgroundColor: theme.colors.accent }]}
        >
          <Icon name="send" size={width * 0.07} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.04,
  },
  avatarCircle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: width * 0.052,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: width * 0.013,
    marginHorizontal: width * 0.03,
  },
  bubble: {
    maxWidth: '75%',
    minWidth: width * 0.13,
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.038,
    paddingVertical: width * 0.02,
    elevation: 1,
  },
  messageText: {
    fontSize: width * 0.046,
    fontWeight: '500',
  },
  timeText: {
    fontSize: width * 0.03,
    alignSelf: 'flex-end',
    marginTop: width * 0.01,
  },
  inputRow: {
    flexDirection: 'row',
    padding: width * 0.03,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: width * 0.035,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.05,
    marginRight: width * 0.03,
  },
  sendButton: {
    borderRadius: width * 0.05,
    width: width * 0.11,
    height: width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
