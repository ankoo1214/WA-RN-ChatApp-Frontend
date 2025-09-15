import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_DARK = '#075E54';
const WHATSAPP_LIGHT_GREY = '#ECECEC';

// Dummy chat list data
const CHATS = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey! How are you?',
    time: '09:31',
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Family Group',
    lastMessage: 'Lunch at 12pm?',
    time: '09:20',
    avatar: 'FG',
  },
  {
    id: '3',
    name: 'Sarah',
    lastMessage: 'See you soon!',
    time: 'Yesterday',
    avatar: 'S',
  },
];

export default function ChatList({ navigation }) {
  const [search, setSearch] = useState('');

  // Filter logic
  const filteredChats = CHATS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.itemContainer,
        { backgroundColor: pressed ? '#f3f7f7' : '#fff' },
      ]}
      android_ripple={{ color: WHATSAPP_GREEN, borderless: false }}
      onPress={() =>
        navigation.navigate('MessageScreen', {
          chatId: item.id,
          chatName: item.name,
          avatar: item.avatar,
        })
      }
    >
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chats</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon
          name="search"
          size={width * 0.06}
          color="#aaa"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search chats"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: '#888', fontSize: width * 0.045 }}>
              No chats found.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHATSAPP_LIGHT_GREY,
    paddingHorizontal: width * 0.02,
    paddingTop: width * 0.04,
  },
  heading: {
    color: WHATSAPP_DARK,
    fontWeight: '700',
    fontSize: width * 0.068,
    marginBottom: width * 0.03,
    paddingLeft: width * 0.02,
    letterSpacing: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.07,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.022,
    marginBottom: width * 0.04,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#222',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.035,
    paddingHorizontal: width * 0.016,
    backgroundColor: '#fff',
    borderRadius: width * 0.031,
    marginBottom: 2,
    elevation: 1,
    shadowColor: WHATSAPP_LIGHT_GREY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  avatarCircle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: WHATSAPP_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.008,
  },
  name: {
    color: WHATSAPP_DARK,
    fontWeight: '600',
    fontSize: width * 0.048,
    marginRight: width * 0.02,
    maxWidth: '72%',
  },
  time: {
    color: '#888',
    fontSize: width * 0.035,
    fontWeight: '400',
  },
  lastMessage: {
    color: '#555',
    fontSize: width * 0.042,
    maxWidth: '95%',
  },
  separator: {
    height: 1.1,
    backgroundColor: WHATSAPP_LIGHT_GREY,
    marginHorizontal: width * 0.02,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.1,
  },
});
