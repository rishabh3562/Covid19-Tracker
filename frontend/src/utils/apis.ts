// useCountriesData.js

import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchCountriesData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/countries'); // Replace with your API endpoint
  return response.data;
};

export const useCountriesData = () => {
  return useQuery('countriesData', fetchCountriesData);
};
