import React, { PureComponent } from 'react';
import { Button, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { login } from '../../Actions/auth';

class Login extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    signUpSuccess: PropTypes.bool.isRequired,
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

  onLogin = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  };

  onRedirect = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  render() {
    const { errorMessage, signUpSuccess } = this.props;
    const { email, password } = this.state;
    return (
      <View>
        <TextInput onChangeText={this.onEditEmail} value={email} />
        <TextInput onChangeText={this.onEditPassword} value={password} />
        <Button title="Login" onPress={this.onLogin} />
        <Button title="SignUp" onPress={this.onRedirect} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  signUpSuccess: state.auth.signUpSuccess,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Login));
