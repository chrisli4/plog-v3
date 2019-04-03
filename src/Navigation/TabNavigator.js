import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Home } from '../Screens/Home';
import { Plant, NewPlant } from '../Screens/Plant';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Plant: {
      screen: Plant,
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
