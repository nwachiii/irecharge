import { CustomToast } from '@/components/reusable-components/toast';
import axios from 'axios';

const geonamesUsername = 'nwachiii';

export async function getLargestCities() {
  try {
    const response = await axios.get(
      `http://secure.geonames.org/searchJSON?username=${geonamesUsername}&featureClass=P&featureCode=PPLA&maxRows=15&orderby=population`
    );
    return response.data.geonames;
  } catch (error) {
   <CustomToast title='An error occured' description={error.response.data.status.message || 'City not found. Please check the city name and try again.'} />;
  }
}