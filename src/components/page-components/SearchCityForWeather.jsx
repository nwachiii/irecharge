import {getWeather} from '@/services';
import React, {useState} from 'react';
import {useQueryClient} from 'react-query';
import {CustomInput} from '../reusable-components/input';
import {CustomToast} from '../reusable-components/toast';
import {Stack, Button} from '@chakra-ui/react';

export const SearchCityForWeather = () => {
	const queryClient = useQueryClient();
	const [cityName, setCityName] = useState('');
	const [weatherData, setWeatherData] = useState(null);

	const handleCityNameChange = (event) => {
		setCityName(event.target.value);
	};

	const handleSearchWeather = async () => {
		try {
			const response = await queryClient.fetchQuery(['weather', cityName], () => getWeather(cityName));
			setWeatherData(response);
		} catch (err) {
			console.log(err);
			handleWeatherError(err);
		}
	};

	const handleWeatherError = (err) => {
		setWeatherData(null);
		return <CustomToast title='An error occured' description={err.response.data.status.message || 'City not found. Please check the city name and try again.'} />;
	};

	return (
		<div>
			<Stack direction={{base: 'column', md: 'row'}} spacing={'5px'} align='center'>
				<CustomInput type='text' placeholder='Enter a city name' value={cityName} onChange={handleCityNameChange} w='70%' />

				<Button isDisabled={cityName == ''} onClick={handleSearchWeather}>
					Search
				</Button>
			</Stack>
			{weatherData && (
				<div>
					<h3>Weather for {cityName}:</h3>
					<p>Temperature: {weatherData?.current?.temperature}°C</p>
					<p>Weather: {weatherData?.current?.weather_descriptions?.[0]}</p>
				</div>
			)}
		</div>
	);
};

export default SearchCityForWeather;
