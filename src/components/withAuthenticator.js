// ... after other import statements
import { withAuthenticator } from 'aws-amplify-react-native';
// ... contents of App component
function App() {
  return (
    <View style={styles.container}>
      <Text>💙 + 💛 = React Native + Amplify </Text>
      <StatusBar style="auto" />
    </View>
  );
}
// wrap the App component as shown below
export default withAuthenticator(App);