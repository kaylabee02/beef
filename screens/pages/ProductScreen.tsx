import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PS from '../client/Product'; // Adjust the import path as necessary

const queryClient = new QueryClient();

const ProductScreen: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PS />
  </QueryClientProvider>
);

export default ProductScreen;
