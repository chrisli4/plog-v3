import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Home } from '../Screens/Home';
import { Plant, NewPlant } from '../Screens/Plant';
import { Posts, NewPost } from '../Screens/Post';

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
    NewPost: {
      screen: NewPost,
    },
  },
  {}
);

export default createBottomTabNavigator({
  Home: {
    screen: HomeStack,
  },
  Posts: {
    screen: Posts,
  },
});
