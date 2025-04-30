import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MenuProvider } from './src/context/MenuProvider';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AccountScreen from './src/screens/AccountScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import RateScreen from './src/screens/RateScreen';
import ReviewsScreen from './src/screens/ReviewsScreen';
import SearchScreen from './src/screens/SearchScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import FavoritesBookScreen from './src/screens/FavoritesBookScreen';
import ManagePostsScreen from './src/screens/ManagePostsScreen';
import EditStoryScreen from './src/screens/EditStoryScreen';

LogBox.ignoreLogs(['Sending', 'Native part of Reanimated']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs">
        {() => <MainTabs setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="RateScreen" component={RateScreen} />
      <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="FavoritesBook" component={FavoritesBookScreen} />
      <Stack.Screen name="ManagePosts" component={ManagePostsScreen} />
      <Stack.Screen name="EditStory" component={EditStoryScreen} />
    </Stack.Navigator>
  );
}

function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f4511e',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Account"
        children={() => <AccountScreen setIsLoggedIn={setIsLoggedIn} />}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  initialParams={{ setIsLoggedIn }}
                />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            ) : (
              <Stack.Screen
                name="MainStack"
                children={() => <MainStack setIsLoggedIn={setIsLoggedIn} />}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </MenuProvider>
  );
}
