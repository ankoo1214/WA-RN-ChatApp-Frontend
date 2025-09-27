import React, { useContext, useState } from 'react';
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
import AddContactModal from '../component/AddContactModal';
import { GlobalContext } from '../context';
import { useTheme } from '../context/ThemeProvider';

const { width } = Dimensions.get('window');

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
  const { addContactModalVisible, setAddContactModalVisible } =
    useContext(GlobalContext);
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  const filteredChats = CHATS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    console.log('Add contact logic here');
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: pressed
            ? theme.colors.card
            : theme.colors.background,
        },
      ]}
      android_ripple={{ color: theme.colors.accent, borderless: false }}
      onPress={() =>
        navigation.navigate('MessageScreen', {
          chatId: item.id,
          chatName: item.name,
          avatar: item.avatar,
        })
      }
    >
      <View
        style={[styles.avatarCircle, { backgroundColor: theme.colors.accent }]}
      >
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.name, { color: theme.colors.title }]}>
            {item.name}
          </Text>
          <Text style={[styles.time, { color: theme.colors.placeholder }]}>
            {item.time}
          </Text>
        </View>
        <Text
          style={[styles.lastMessage, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.heading, { color: theme.colors.title }]}>Chats</Text>

      <View style={[styles.searchBar, { backgroundColor: theme.colors.card }]}>
        <Icon
          name="search"
          size={width * 0.06}
          color={theme.colors.placeholder}
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search chats"
          placeholderTextColor={theme.colors.placeholder}
          style={[styles.searchInput, { color: theme.colors.text }]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.colors.separator },
            ]}
          />
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={{
                color: theme.colors.placeholder,
                fontSize: width * 0.045,
              }}
            >
              No chats found.
            </Text>
          </View>
        }
      />

      {/* Floating Add Contact (+) Button */}
      <Pressable
        style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => setAddContactModalVisible(true)}
      >
        <Icon name="add" size={width * 0.09} color="#fff" />
      </Pressable>

      <AddContactModal
        visible={addContactModalVisible}
        onClose={() => setAddContactModalVisible(false)}
        onAdd={handleAdd}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.02,
    paddingTop: width * 0.04,
  },
  heading: {
    fontWeight: '700',
    fontSize: width * 0.068,
    marginBottom: width * 0.03,
    paddingLeft: width * 0.02,
    letterSpacing: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * 0.07,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.022,
    marginBottom: width * 0.04,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.045,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.035,
    paddingHorizontal: width * 0.016,
    borderRadius: width * 0.031,
    marginBottom: 2,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  avatarCircle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
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
    fontWeight: '600',
    fontSize: width * 0.048,
    marginRight: width * 0.02,
    maxWidth: '72%',
  },
  time: {
    fontSize: width * 0.035,
  },
  lastMessage: {
    fontSize: width * 0.042,
    maxWidth: '95%',
  },
  separator: {
    height: 1.1,
    marginHorizontal: width * 0.02,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.1,
  },
  fab: {
    position: 'absolute',
    right: width * 0.055,
    bottom: width * 0.055,
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
  },
});
