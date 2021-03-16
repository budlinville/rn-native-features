import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
	return async dispatch => {
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
				'Dummy address',
				15.6,
				12.3
			);
			dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title, image: newPath } });
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
