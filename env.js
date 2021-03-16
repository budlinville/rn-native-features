const variables = {
	development: {
		googleApiKey: 'AIzaSyAgXmvLpViw9diW6YHLXwf_BC2MuOk4OGY'
	},
	production: {
		googleApiKey: 'AIzaSyAgXmvLpViw9diW6YHLXwf_BC2MuOk4OGY'
	}
};

const getEnvVariables = () => {
	if (__DEV__) {
		return variables.development; // return this if in development mode
	}
	return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
