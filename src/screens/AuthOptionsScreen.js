import { Button, Text, View } from "react-native";

export default function authOptionsScreen({ navigation }) {
  return (
    <View>
      <Text>Training</Text>
      <Button
        title="AuthOptions"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
