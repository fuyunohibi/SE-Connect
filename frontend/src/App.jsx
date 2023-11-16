import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import Main from './main/Main';
import { AuthProvider } from "@/components/AuthProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
