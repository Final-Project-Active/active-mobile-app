import { useState } from 'react';
import AuthContext from './src/contexts/authContext';
import Navigation from './src/navigators/Navigation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProgressForm, setIsProgressForm] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isProgressForm, setIsProgressForm }}>
      <Navigation />
    </AuthContext.Provider>
  );
}
