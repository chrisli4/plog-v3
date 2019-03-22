import React, { PureComponent } from 'react';
import { Button, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { signUp } from '../../Actions/auth';

class SignUp extends PureComponent {
  static propTypes = {
    signUp: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  onEditEmail = email => {
    this.setState({
      email,
    });
  };

  onEditPassword = password => {
    this.setState({
      password,
    });
  };

  onSignUp = () => {
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp(email, password);
  };

  onRedirect = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  render() {
    const { email, password } = this.state;
    return (
      <View>
        <TextInput onChangeText={this.onEditEmail} value={email} />
        <TextInput onChangeText={this.onEditPassword} value={password} />
        <Button title="SignUp" onPress={this.onSignUp} />
        <Button title="Login" onPress={this.onRedirect} />
      </View>
    );
  }
}

const mapDispatchToProps = {
  signUp,
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SignUp));
