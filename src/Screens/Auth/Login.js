import React, { PureComponent } from 'react';
import { Button, Text, TextInput, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { login, clearError } from '../../Actions/auth';

class Login extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
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
    const { navigation, clearError } = this.props;
    clearError();
    navigation.navigate('SignUp');
  };

  render() {
    const { error } = this.props;
    const { email, password } = this.state;
    return (
      <SafeAreaView>
        {error && <Text>{error}</Text>}
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
});

const mapDispatchToProps = {
  clearError,
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Login));
