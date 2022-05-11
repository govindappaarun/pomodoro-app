import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app.router';
import { ChakraProvider, theme } from '@chakra-ui/react';
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}
