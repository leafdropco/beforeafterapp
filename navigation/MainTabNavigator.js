import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import PresentationScreen from '../screens/PresentationScreen';
export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Presentation: {
      screen: PresentationScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Profile':
            iconName = Platform.OS === 'ios' ? `ios-person` : 'md-person';
            break;
          case 'Presentation':
            iconName = Platform.OS === 'ios' ? `ios-image` : `md-image`;
            break;
          case 'Home':
            iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
