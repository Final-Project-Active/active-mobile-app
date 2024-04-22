import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import AuthContext from '../contexts/authContext';
import { deleteItemAsync } from 'expo-secure-store';

export default function ProfileScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleSignOut = async () => {
    try {
      await deleteItemAsync('user');
      setIsLoggedIn(false);
      navigation.navigate('HomeScreen')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};