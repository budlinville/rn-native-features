import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
	return async dispatch => {
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
			location.lat},${location.lng}&key=${ENV().googleApiKey}`);

		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		const respData = await response.json();
		if (!respData.results) {
			throw new Error('Something went wrong!');
		}

		const address = respData.results[0].formatted_address;

		// strip directories from file path
		const fileName = image.split('/').pop();

		// documentDirectory will be most commonly used.. do note that this
		// directory will be wiped on app deletion
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			// move image from temporary directory to more permanent location
			await FileSystem.moveAsync({
				from: image,
				to: newPath
			});
			const dbResult = await insertPlace(
				title,
				newPath,
				address,
				location.lat,
				location.lng
			);
			dispatch({type: ADD_PLACE, placeData: {
				id: dbResult.insertId,
				title,
				image: newPath,
				address,
				coords: { lat: location.lat, lng: location.lng }
			}});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadPlaces = () => {
	return async dispatch => {
		try {
			const dbResult = await fetchPlaces();
			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (err) {
			throw err;
		}
	};
};
