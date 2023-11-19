import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
const appid = '877cdfb4450d0d83f4e226357da46afd';
const openWeatherMapURL = 'https://api.openweathermap.org/data/2.5';


// Create a slice for the weather reducer
export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		weatherData: null,
		loading: false,
		error: null,
		forecastData: null,
		weekForecast: null,
		todaysForecastData: null,
		next5daysForeCast: null,

	},
	reducers: {
		setError: (state, action) => {
			state.error = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setWeatherData: (state, action) => {
			state.weatherData = action.payload
		},
		setForecastData: (state, action) => {
			state.forecastData = action.payload;
			let currentDate = moment(); // Define currentDate variable
			let next5days = [];
			for (let i = 0; i < 5; i++) {
				let date = moment(currentDate).add(i, 'days').format('YYYY-MM-DD');
				next5days.push({ [date]: [] });
			}


			next5days.forEach((data) => {
				action.payload.list.forEach((item) => {
					if (item.dt_txt.split(' ')[0] === Object.keys(data)[0]) {
						data[Object.keys(data)[0]].push(item);
					}
				});
			});

			state.weekForecast = next5days;
			state.todaysForecastData = next5days[0][Object.keys(next5days[0])[0]];
			let next5daysForeCast = [];
			next5days.forEach((item) => {
				next5daysForeCast.push(item[Object.keys(item)[0]][0]);

			});
			state.next5daysForeCast = next5daysForeCast;
			console.log(next5daysForeCast);

		},
	},
})

const { setError, setLoading, setWeatherData, setForecastData } = weatherSlice.actions;



export const fetchWeatherData = async (dispatch, payload) => {
	const { lat, lon, city } = payload || {};
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`${openWeatherMapURL}/weather`, {
			params: {
				lat,
				lon,
				appid,
				units: 'metric',
				q: city,
			},
		});
		dispatch(setLoading(false));
		dispatch(setWeatherData(data));
		await fetchForecastData(dispatch, { lat: data.coord.lat, lon: data.coord.lon, city: data.name });
	} catch (error) {
		console.log(error);
		dispatch(setError(error.response.data.message));
		dispatch(setLoading(false));
	}
};

export const fetchForecastData = async (dispatch, payload) => {
	const { lat, lon, city } = payload || {};
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`${openWeatherMapURL}/forecast`, {
			params: {
				lat,
				lon,
				appid,
				units: 'metric',
				q: city,
			},
		});
		dispatch(setLoading(false));
		dispatch(setForecastData(data));
	} catch (error) {
		dispatch(setError(error.response.data.message));
		dispatch(setLoading(false));
	}
};

export default weatherSlice.reducer;

