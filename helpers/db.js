import * as SQLite from 'expo-sqlite';

// will either connect to or create database
const db = SQLite.openDatabase('places.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL);',
				[],
				() => resolve(),	// on success
				(_, err) => reject(err)	// on failure
			);
		});
	});
	return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				// why can't I just use `INSERT... ${someVar}...`?
				// Subject to SQL Injection attacks; use below pattern instead
				'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
				[title, imageUri, address, lat, lng],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'SELECT * FROM places',
				[],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};
