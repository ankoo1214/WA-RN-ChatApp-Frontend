import React, { createContext, useContext, useState, useMemo , useEffect} from 'react';
import { useColorScheme } from 'react-native';

const LightTheme = {
  dark: false,
  colors: {
    background: '#fff',
    card: '#F5F7F7',
    text: '#222',
    title: '#075E54',
    accent: '#25D366',
    separator: '#ECECEC',
    input: '#f5f5f5',
    placeholder: '#888',
    fab: '#25D366',
    avatarBg: '#e2fbee',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: '#111C17',
    card: '#1F282E',
    text: '#f0f4f8',
    title: '#25D366',
    accent: '#25D366',
    separator: '#2B343A',
    input: '#1D282F',
    placeholder: '#8ba7ab',
    fab: '#25D366',
    avatarBg: '#16372b',
  },
};

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }) {
  const systemColor = useColorScheme();
  const [isDark, setIsDark] = useState(systemColor=== 'dark');
  useEffect(() => {
    setIsDark(systemColor === 'dark');
    console.log('Theme-->', systemColor);

  }, [systemColor]);
  const toggleTheme = () => setIsDark(dark => !dark);

  const value = useMemo(
    () => ({
      theme: isDark ? DarkTheme : LightTheme,
      toggleTheme,
      isDark,
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
