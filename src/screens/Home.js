import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Update from './Update';
import Calls from './Calls';
import ChatList from './ChatList';
import Settings from './Settings';

const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_DARK = '#075E54';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: WHATSAPP_GREEN,
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
        },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 14 },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Updates')
            iconName = focused ? 'sync' : 'sync-outline';
          else if (route.name === 'Calls')
            iconName = focused ? 'call' : 'call-outline';
          else if (route.name === 'Chats')
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Settings')
            iconName = focused ? 'settings' : 'settings-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Updates"
        component={Update}
        options={{ tabBarLabel: 'Updates' }}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{ tabBarLabel: 'Calls' }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={{ tabBarLabel: 'Chats' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
