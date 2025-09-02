import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material';

export const baseTheme: Theme = createTheme({
  typography: {
    fontFamily: [
      'Cormorant Garamond',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

// Sticking with dark theme for now
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
  },
});
