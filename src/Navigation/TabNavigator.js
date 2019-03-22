import { createBottomTabNavigator } from 'react-navigation';
import { Home } from '../Screens/Home';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {}
);
