import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';
import { getPlantSuccess, getInitialPosts } from '../../Actions/plant';
import { getPlants, refreshPlants } from '../../Actions/plants';
import { pickPhoto } from '../../Actions/photo';
import { logout } from '../../Actions/auth';

class Home extends PureComponent {
  static propTypes = {
    cursor: PropTypes.any,
    getPlants: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    cursor: null,
    user: {},
  };

  componentDidMount() {}

  onGet = () => {
    const { getPlants, cursor, user } = this.props;
    getPlants(cursor, user.uid);
  };

  onRefresh = () => {
    const { refreshPlants, user } = this.props;
    refreshPlants(user.uid);
  };

  onSelect = plant => {
    const { navigation, getPlantSuccess, getInitialPosts } = this.props;
    getPlantSuccess(plant);
    getInitialPosts(plant.id);
    navigation.navigate('Plant');
  };

  onAdd = () => {
    const { pickPhoto } = this.props;
    pickPhoto('NewPlant');
  };

  onLogout = () => {
    const { logout } = this.props;
    logout();
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
            <Text onPress={() => this.onSelect(item)}>{item.id}</Text>
          )}
          onEndReached={this.onGet}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
        />
        <Text onPress={this.onGet}>Get</Text>
        <Text onPress={this.onAdd}>Add</Text>
        <Text onPress={this.onLogout}>Logout</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  plants: state.plants.items,
  cursor: state.plants.cursor,
  refreshing: state.plants.refreshing,
});

const mapDispatchToProps = {
  getPlants,
  getPlantSuccess,
  getInitialPosts,
  logout,
  pickPhoto,
  refreshPlants,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
