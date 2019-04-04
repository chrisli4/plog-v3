import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, View, Text } from 'react-native';
import { getPosts } from '../../Actions/posts';

class Posts extends PureComponent {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
  };

  onGetPosts = () => {
    const { getPosts, cursor } = this.props;
    getPosts(cursor);
  };

  onRefreshPosts = () => {};

  render() {
    const { posts } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text onPress={this.onRefreshPosts}>Refresh</Text>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text>{item.id}</Text>}
          showsVerticalScrollIndicator={false}
        />
        <Text onPress={this.onGetPosts}>Get Posts</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  cursor: state.posts.cursor,
});

const mapDispatchToProps = {
  getPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
