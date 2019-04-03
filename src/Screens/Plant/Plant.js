import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView, Text } from 'react-native';

class Plant extends PureComponent {
  static propTypes = {

  };

  static defaultProps = {

  };

  componentDidMount() {}

  render() {
    const { id } = this.props;
    return <SafeAreaView><Text>{ id }</Text></SafeAreaView>;
  }
}

const mapStateToProps = state => ({
  id: state.plant.id,
});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plant);