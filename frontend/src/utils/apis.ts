import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchCountriesData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/countries'); // Replace with your API endpoint
  return response.data;
};
export const fetchData = async () => {
  const result = await axios.get("https://disease.sh/v3/covid-19/all");

  return result.data;
};
export const useCountriesData = () => {
  return useQuery('countriesData', fetchCountriesData);
};

export const fetchCovidData = async (apiUrl: string) => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const useCovidData = (apiUrl: string) => {
  return useQuery('covidData', () => fetchCovidData(apiUrl));
};
