import { Global, css } from "@emotion/react";
import { useQuery } from 'react-query';
import { useEffect, useState } from "react";
import type { Country,CardGridProps,CountryData } from "../../types";
import CardComponent from "../../components/CardComponet";
import { fetchData ,useCountriesData} from "../../utils/apis";
import MapComponent from "../../components/MapComponent";
import CovidGraph from "../../components/CovidGraph";

const CardGrid: React.FC<CardGridProps> = ({ data }) => {

  return (<>

    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

      <CardComponent
        cardTitle="Total Cases"
        value={data.cases}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Total reported cases worldwide."
        customColor="blue"
      />

      <CardComponent
        cardTitle="Total Deaths"
        value={data.deaths}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Total reported deaths worldwide."
        customColor="red"
      />

      <CardComponent
        cardTitle="Total Recovered"
        value={data.recovered}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Total recovered cases worldwide."
        customColor="green"
      />

      <CardComponent
        cardTitle="Currently Infected"
        value={data.active}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Current active cases worldwide."
        customColor="orange"
      />

      <CardComponent
        cardTitle="New Cases"
        value={data.todayCases}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Newly reported cases today."
        customColor="blue"
      />

      <CardComponent
        cardTitle="New Deaths"
        value={data.todayDeaths}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Newly reported deaths today."
        customColor="red"
      />

      <CardComponent
        cardTitle="New Recovered"
        value={data.todayRecovered}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Newly reported recovered cases today."
        customColor="green"
      />

      <CardComponent
        cardTitle="Total Tests"
        value={data.tests}
        lastUpdate={new Date(data.updated)}
        cardSubtitle="Total COVID-19 tests conducted."
        customColor="purple"
      />





    </div>


  </>
  );
};

const App: React.FunctionComponent = () => {
  const { data, isLoading } = useQuery('globalData', fetchData);
  const { data: countriesData, isError } = useCountriesData();

  return (
    <div className="bg-gray-100">
      {isLoading ? (
        'Loading...'
      ) : data ? (
        <>
          <Global
            styles={css`
              body {
                background-color: #f1f5f9;
              }
            `}
          />
        
         
          <div className="bg-white p-4 rounded-lg shadow-md w-4/5 mx-auto my-3">
            <h1 className="text-xl font-semibold mb-4">COVID-19 Map</h1>
            {countriesData && (
              <div className="w-ful h-96 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]  rounded-lg overflow-hidden">
                <MapComponent countriesData={countriesData as CountryData[]} />
              </div>
            )}
          </div>
          <hr />
          <div className="bg-white p-4 rounded-lg shadow-md w-4/5 mx-auto my-3">
            <h1 className="text-xl font-semibold mb-4 mx-auto" >COVID-19 Graph</h1>
            <CovidGraph/>
          </div>
          <hr />
          <div className="bg-white p-4 rounded-lg shadow-md w-4/5 mx-auto my-3">
            <h1 className="text-xl font-semibold mb-4">Global Stats</h1>
            <CardGrid data={data} />
          </div>
      
     
         
        
         
        </>
      ) : null}
    </div>
  );
};

export default App;



/*

import React from 'react';
import MapComponent from './components/MapComponent';
import { useCountriesData } from './utils/apis'; // Import the custom hook
import { CountryData } from './types'; // Import the type

const App: React.FC = () => {
  const { data: countriesData, isLoading, isError } = useCountriesData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>COVID-19 Map</h1>
      {countriesData && (
        <MapComponent countriesData={countriesData as CountryData[]} />
      )}
    </div>
  );
};

export default App;







*/