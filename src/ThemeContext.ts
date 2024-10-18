import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    inputBackground: '#ffffff',
    inputColor: '#000000',
    buttonBackground: 'rgb(64, 154, 184)',
    buttonColor: '#ffffff',
    noteBackground: '#f9f9f9',
    noteColor: '#000000',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    inputBackground: '#333333',
    inputColor: '#ffffff',
    buttonBackground: 'rgb(106, 175, 198)',
    buttonColor: '#ffffff',
    noteBackground: '#555555',
    noteColor: '#ffffff',
  },
};

export const ThemeContext = React.createContext(themes.light);