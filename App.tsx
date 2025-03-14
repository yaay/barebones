import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingleProfileScreen } from './screens/profiles/SingleProfile.screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
  SingleProfile: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="SingleProfile" 
            component={SingleProfileScreen}
            options={{ title: 'Pet Profile' }}
            initialParams={{ id: 'f94e84f8-3414-441d-bf50-4373578021fc' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
} 