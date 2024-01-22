
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';

const stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name='Tab' component={TabNavigator} options={{ animation: "slide_from_bottom" }}></stack.Screen>
        <stack.Screen name='Details' component={DetailsScreen} options={{ animation: "slide_from_bottom" }}></stack.Screen>
        <stack.Screen name='Payment' component={PaymentScreen} options={{ animation: "slide_from_bottom" }}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}


/* import Icon from 'react-native-vector-icons/FontAwesome'; */
{/* <Icon name="search" size={30} color="gray" /> */ }