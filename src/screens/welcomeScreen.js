import { Button, Text, View } from "react-native";

export default function welcomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('AuthOptions')}
      />
    </View>
  );
}