import React from 'react';
import { View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; // eslint-disable-line
import { Constants } from 'expo';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from './src/config/configureStore';

import ShoppingList from './src/screens/ShoppingList';
import ShoppingListEditItem from './src/screens/ShoppingListEditItem';
import Items from './src/screens/Items';
import ItemAddEdit from './src/screens/ItemAddEdit';
import AlertContainer from './src/components/alerts/AlertContainer';

const { persistor, store } = configureStore();

const MainScreenNavigator = TabNavigator(
  {
    List: {
      screen: StackNavigator({
        ShoppingList: {
          screen: ShoppingList,
        },
        ShoppingListEditItem: {
          screen: ShoppingListEditItem,
          navigationOptions: () => ({
            headerStyle: {
              marginTop: -Constants.statusBarHeight,
            },
          }),
        },
      }),
      navigationOptions: () => ({
        tabBarLabel: 'Shop List',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="cart" size={18} color={tintColor} />
        ), // eslint-disable-line
      }),
    },
    Items: {
      screen: StackNavigator({
        Items: {
          screen: Items,
        },
        ItemAddEdit: {
          screen: ItemAddEdit,
          navigationOptions: () => ({
            headerStyle: {
              marginTop: -Constants.statusBarHeight,
            },
          }),
        },
      }),
      navigationOptions: () => ({
        tabBarLabel: 'Items',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="food-apple" size={18} color={tintColor} />
        ), // eslint-disable-line
      }),
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 10,
        marginBottom: 0,
        marginTop: 0,
      },
      iconStyle: {
        padding: 2,
        height: 20,
        margin: 0,
      },
      tabStyle: {
        padding: 5,
        height: 46,
      },
      style: {
        backgroundColor: '#5CB85C',
      },
    },
  },
);

const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color="blue" />
  </View>
);

const App = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <StatusBar backgroundColor="#5CB85C" barStyle="light-content" />
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <MainScreenNavigator />
          <AlertContainer />
        </View>
      </PersistGate>
    </Provider>
  </SafeAreaView>
);

export default App;
