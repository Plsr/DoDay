import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, createContext } from 'react';
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SplashScreen from './src/screens/SplashScreen';
import Todo from './src/util/Todo'
import { TodoContext, TodoContextType } from './src/util/context';

export default function App() {

  const Stack = createNativeStackNavigator()
  const [todos, setTodos] = useState([] as Todo[])

  return (
    <TodoContext.Provider value={{todos, setTodos}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContext.Provider>

  );
}

