import React, { PureComponent } from 'react';
import { Button, TextInput, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { login } from '../../Actions/auth';

class Login extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
    signUpSuccess: PropTypes.bool,
  };

  static defaultProps = {
    error: '',
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
    const { error, signUpSuccess } = this.props;
    const { email, password } = this.state;
    return (
      <SafeAreaView>
        <TextInput onChangeText={this.onEditEmail} value={email} />
        <TextInput onChangeText={this.onEditPassword} value={password} />
        <Button title="Login" onPress={this.onLogin} />
        <Button title="SignUp" onPress={this.onRedirect} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  signUpSuccess: state.auth.signUpSuccess,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Login));
