import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, View, Text, TextInput } from 'react-native';
import { addPlant } from '../../Actions/plants';

class NewPlant extends PureComponent {
  static propTypes = {};

  state = {
    name: '',
    species: '',
    genus: '',
    description: '',
  };

  onUploadPlant = () => {
    const { addPlant, uri, navigation } = this.props;
    const { name, species, genus, description } = this.state;
    addPlant({ name, species, genus, description }, uri);
    navigation.navigate('Home');
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
        <TextInput
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Species"
          onChangeText={text => {
            this.setState({ species: text });
          }}
        />
        <TextInput
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Genus"
          onChangeText={text => {
            this.setState({ genus: text });
          }}
        />
        <TextInput
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Name"
          onChangeText={text => {
            this.setState({ name: text });
          }}
        />
        <Text onPress={this.onUploadPlant}>Upload</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  uri: state.photo.photo.uri,
});

const mapDispatchToProps = {
  addPlant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPlant);
