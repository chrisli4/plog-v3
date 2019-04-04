import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, FlatList, SafeAreaView, Text } from 'react-native';
import { getPosts, getInitialPosts } from '../../Actions/plant';
import { pickPhoto } from '../../Actions/photo';

class Plant extends PureComponent {
  static propTypes = {};

  onGetPosts = () => {
    const { getPosts, cursor, id } = this.props;
    getPosts(cursor, id);
  };

  onRefreshPosts = () => {
    const { getInitialPosts, id } = this.props;
    getInitialPosts(id);
  };

  onAddPost = () => {
    const { pickPhoto } = this.props;
    pickPhoto('NewPost');
  };

  render() {
    const { name, image, posts } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{name}</Text>
        <Image
          source={{ uri: image }}
          style={{ height: 300, width: 400 }}
        />
        <FlatList
          data={posts}
          extraData={this.props}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text>{item.id}</Text>}
          showsVerticalScrollIndicator={false}
        />
        <Text onPress={this.onRefreshPosts}>Refresh</Text>
        <Text onPress={this.onGetPosts}>Get Posts</Text>
        <Text onPress={this.onAddPost}>Add Post</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  id: state.plant.id,
  name: state.plant.name,
  image: state.plant.image,
  posts: state.plant.posts,
  cursor: state.plant.cursor,
});

const mapDispatchToProps = {
  getPosts,
  getInitialPosts,
  pickPhoto,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plant);
