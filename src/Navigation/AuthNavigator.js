import { createStackNavigator } from 'react-navigation';

import { Login, SignUp } from '../Screens/Auth';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);
