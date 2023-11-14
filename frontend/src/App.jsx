import React from 'react';
import Main from './main/Main';
import { AuthProvider } from "@/components/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;