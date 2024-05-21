import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PS from '../client/Account'; // Adjust the import path as necessary

const queryClient = new QueryClient();

const AccountScreen: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PS />
  </QueryClientProvider>
);

export default AccountScreen;
