import { Fragment, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useGlobalStore } from "./utils/Store/Store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Products from './components/Products';
import Wishlist from './components/Wishlist';
import Header from "./components/Header";
import Details from './components/Details';
import Authentication from './components/Authentication';
import AuthenticationInstance from './utils/Authentication/Instance';

export default function App() {
  const Stack = createStackNavigator();

  const State = {
    Loading: useGlobalStore((Store) => Store.Loading)
  };

  const Update = {
    ActiveScreen: useGlobalStore((Store) => Store.setActiveScreen)
  };

  useEffect(() => {
    const Unsubscribe = AuthenticationInstance.AuthSubscription();

    return () => Unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer onStateChange={(state) => Update.ActiveScreen(state.routes[state.index]?.name)}>
        <Header />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen title="Products" name="Products" component={Products} />
          <Stack.Screen title="Wishlist" name="Wishlist" component={Wishlist} />
          <Stack.Screen title="Details" name="Details" component={Details} />
          <Stack.Screen title="Authentication" name="Authentication" component={Authentication} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});