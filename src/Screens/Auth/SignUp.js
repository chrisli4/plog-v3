import React, { PureComponent } from 'react';
import { Button, Text, TextInput, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { signUp, clearError } from '../../Actions/auth';

class SignUp extends PureComponent {
  static propTypes = {
    signUp: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
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

  onSignUp = () => {
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp(email, password);
  };

  onRedirect = () => {
    const { navigation, clearError } = this.props;
    clearError();
    navigation.navigate('Login');
  };

  render() {
    const { error } = this.props;
    const { email, password } = this.state;
    return (
      <SafeAreaView>
        {
          error && <Text>{ error }</Text>
        }
        <TextInput onChangeText={this.onEditEmail} value={email} />
        <TextInput onChangeText={this.onEditPassword} value={password} />
        <Button title="SignUp" onPress={this.onSignUp} />
        <Button title="Login" onPress={this.onRedirect} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  signUp,
  clearError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(SignUp));
