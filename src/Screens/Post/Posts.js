import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, View, RefreshControl, Text } from 'react-native';
import { getPosts, refreshPosts } from '../../Actions/posts';

class Posts extends PureComponent {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
  };

  onGet = () => {
    const { getPosts, cursor } = this.props;
    getPosts(cursor);
  };

  onRefresh = () => {
    const { refreshPosts } = this.props;
    refreshPosts();
  };

  render() {
    const { posts, refreshing } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text onPress={this.onRefresh}>Refresh</Text>
        <FlatList
          data={posts}
          refreshControl={
            <RefreshControl
  refreshing={refreshing}
  onRefresh={this.onRefresh}
/>
          }
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text>{item.id}</Text>}
          showsVerticalScrollIndicator={false}
        />
        <Text onPress={this.onGet}>Get Posts</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  cursor: state.posts.cursor,
  refreshing: state.posts.refreshing,
});

const mapDispatchToProps = {
  getPosts,
  refreshPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
