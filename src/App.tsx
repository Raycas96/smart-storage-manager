import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ValuesTab from './components/ValuesTab';

export const themeOptions: ThemeOptions = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffedfe',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffedfe',
            },
            '&:hover fieldset': {
              borderColor: '#eddcff',
              borderWidth: '0.15rem',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          root: {
            '& .MuiInput-underline:after': {
              borderBottomColor: '#ffedfe',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffedfe',
              },
              '&:hover fieldset': {
                borderColor: '#eddcff',
                borderWidth: '0.15rem',
              },
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffedfe',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffedfe',
            },
            '&:hover fieldset': {
              borderColor: '#eddcff',
              borderWidth: '0.15rem',
            },
          },
          '& svg': {
            color: '#ffedfe',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#eddcff',
      dark: '#eddcff',
      light: '#ffedfe',
      contrastText: '#e2fbf9',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: 'rgb(36, 36, 36)',
      paper: 'rgb(36, 36, 36)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffedfe',
      disabled: '#f5f5f5',
    },
    divider: '#eddcff',
  },
});

const App = () => (
  <div className="App h-100">
    <Header />
    <ThemeProvider theme={themeOptions}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ValuesTab />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  </div>
);

export default App;
