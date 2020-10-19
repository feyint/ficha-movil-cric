import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#009688',
    primaryLight: '#52c7b8',
    primaryDark: '#00675b',
    primaryFont: '#000000',
    accent: '#00796b',
    secondary: '#3f51b5',
    secondaryLight: '#757de8',
    secondaryDark: '#002984',
    secondaryFont: '#ffffff',
    error: '#f13a59',
  },
};
