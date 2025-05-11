

import { Dimensions, Platform } from 'react-native';
import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

// Se obtiene el ancho de la pantalla solo una vez
const { width } = Dimensions.get('window');
const scale = width / 380; // 375 es tu ancho base de diseño


const theme: MD3Theme = {
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors,
    primary: '#b5c959',
    secondary: '#011B31',
    background: '#0f182b',
    surface: '#FFFFFF',    
    error: '#b60f2eaf',
    onSurface: '#000000',
    onBackground: '#FFFFFF',
    scrim:'#686D76'
  },
};

export default theme;

