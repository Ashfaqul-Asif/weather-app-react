import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const appid = '877cdfb4450d0d83f4e226357da46afd';
const openWeatherMapURL = 'https://api.openweathermap.org/data/2.5';


// Create a slice for the weather reducer
export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		weatherData: null,
		loading: false,
		error: null,
		forecastData: null
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
			state.forecastData = action.payload
		},
	},
})

const { setError, setLoading, setWeatherData, setForecastData } = weatherSlice.actions;
export const fetchWeatherData = (dispatch, payload) => {
	const { lat, lon, city } = payload || {}
	dispatch(setLoading(true))
	axios.get(`${openWeatherMapURL}/weather`, {
		params: {
			lat,
			lon,
			appid,
			units: 'metric',
			q: city

		}
	})
		.then(({ data }) => {
			dispatch(setLoading(false))
			dispatch(setWeatherData(data))
		})
		.catch((error) => {
			dispatch(setError(error))
			dispatch(setLoading(false))
		})
}
export const fetchForecastData = (dispatch, payload) => {
	const { lat, lon, city } = payload || {}
	dispatch(setLoading(true))
	axios.get(`${openWeatherMapURL}/forecast`, {
		params: {
			lat,
			lon,
			appid,
			units: 'metric',
			q: city

		}
	})
		.then(({ data }) => {
			dispatch(setLoading(false))
			dispatch(setForecastData(data))
		})
		.catch((error) => {
			dispatch(setError(error))
			dispatch(setLoading(false))
		})
}
export default weatherSlice.reducer;

