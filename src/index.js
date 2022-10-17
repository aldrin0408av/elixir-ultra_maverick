import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme';
import { QueryClientProvider, QueryClient } from 'react-query'
import App from './@features/App';

const queryClient = new QueryClient()

const myRoot = document.getElementById('root')
const root = createRoot(myRoot);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

