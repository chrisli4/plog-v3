import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';
import { getPlants, refreshPlants } from '../../Actions/plants';

class Home extends PureComponent {
  static propTypes = {
    cursor: PropTypes.any,
    getPlants: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
  };

  static defaultProps = {
    cursor: null,
  };

  componentDidMount() {}

  onGet = () => {
    const { getPlants, cursor, uid } = this.props;
    getPlants(cursor, uid);
  };

  onRefresh = () => {
    const { refreshPlants, uid } = this.props;
    refreshPlants(uid);
  };

  onSelect = () => {};

  onAdd = () => {
    const { pickPhoto } = this.props;
    pickPhoto('NewPlant');
  };

  render() {
    const { plants, refreshing } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          data={plants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text onPress={this.onSelect}>{item.id}</Text>
          )}
          onEndReached={this.onGet}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
        />
        <Text onPress={this.onGet}>Get</Text>
        <Text onPress={this.onAdd}>Add</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.user.uid,
  plants: state.plants.items,
  cursor: state.plants.cursor,
  refreshing: state.plants.refreshing,
});

const mapDispatchToProps = {
  getPlants,
  refreshPlants,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
