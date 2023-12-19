import { CustomToast } from '@/components/reusable-components/toast';
import axios from 'axios';

const apiKey = 'ed76e103897ad148e15e35d33729367b';

export async function getWeather(cityName) {
	try {
		const response = await axios.get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`);
		return response.data;
	} catch (error) {
		 <CustomToast title='An error occured' description={error.response.data.status.message || 'City not found. Please check the city name and try again.'} />;
	}
}
