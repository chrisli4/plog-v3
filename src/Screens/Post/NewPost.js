import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, View, Text, TextInput } from 'react-native';
import { addPost } from '../../Actions/plant';

class NewPost extends PureComponent {
  static propTypes = {};

  state = {
    description: '',
  };

  onUpload = () => {
    const { id, addPost, uri, navigation } = this.props;
    const { description } = this.state;
    addPost({ pid: id, description }, uri);
    navigation.navigate('Plant');
  };

  render() {
    const { uri } = this.props;
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={text => {
            this.setState({ description: text });
          }}
        />
        <Text onPress={this.onUpload}>Upload</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  id: state.plant.id,
  uri: state.photo.photo.uri,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
