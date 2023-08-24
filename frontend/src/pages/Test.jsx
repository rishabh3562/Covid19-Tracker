import React from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import 'chart.js';

const fetchCovidData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const formatChartData = (countryData) => {
    return {
        labels: ['Cases', 'Deaths', 'Recovered', 'Active'],
        datasets: [
            {
                label: countryData.country,
                data: [
                    countryData.cases,
                    countryData.deaths,
                    countryData.recovered,
                    countryData.active,
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };
};

const ChartComponent = () => {
    const { data, error, isLoading } = useQuery('covidData', fetchCovidData);
    // console.log("data in ChartComponent:", data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const countriesData = data; // Assuming the data is an array of country objects

    return (
        <div>
            <h1>COVID-19 Statistics</h1>
            {countriesData.map((countryData, index) => (
                <div key={index}>
                    <h2>{countryData.country}</h2>
                    <Line data={formatChartData(countryData)} />
                </div>
            ))}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <ChartComponent />
        </div>
    );
};

export default App;
