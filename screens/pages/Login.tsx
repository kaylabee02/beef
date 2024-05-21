import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PS from '../client/User'; // Adjust the import path as necessary

const queryClient = new QueryClient();

const Login: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PS />
  </QueryClientProvider>
);

export default Login;
