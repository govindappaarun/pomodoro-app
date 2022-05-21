import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app.router';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Provider from './contexts';
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
