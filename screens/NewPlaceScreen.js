import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const titleChangeHandler = text => setTitleValue(text);

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const imageTakenHandler = imagePath => setSelectedImage(imagePath);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
        <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
