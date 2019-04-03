import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Home } from '../Screens/Home';
import { NewPlant } from '../Screens/Plant';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    NewPlant: {
      screen: NewPlant,
    },
  },
  {}
);

export default createBottomTabNavigator({
  Home: {
    screen: HomeStack,
  },
});
