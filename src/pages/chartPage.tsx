import { Global, css } from "@emotion/react";
import { useQuery } from 'react-query';
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import GlobalInfo from "../components/GlobalInfo";
import type { ResponseData1, Country } from "../types";
import CardComponent from "../components/CardComponet";
const fetchData = async () => {
  const result = await fetch("https://disease.sh/v3/covid-19/all");
  const data: ResponseData1 = await result.json();
  return data;
};
interface CovidData {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

// Now you can use the CovidData interface in your component to properly type the API response

interface CardGridProps {
  data: CovidData;
}


const CardGrid: React.FC<CardGridProps> = ({ data }) => {
  console.log(data)

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

  const [activeCountries, setActiveCountries] = useState<Country[]>([]);

  const onCountryClick = (country: Country) => {
    const countryIndex = activeCountries.findIndex(
      (activeCountry) => activeCountry.ID === country.ID
    );

    if (countryIndex > -1) {
      const newActiveCountries = [...activeCountries];
      newActiveCountries.splice(countryIndex, 1);

      setActiveCountries(newActiveCountries);
    } else {
      setActiveCountries([...activeCountries, country]);
    }
  };

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: #f1f1f1;
            color: #7d7d7d;
          }
        `}
      />

      {isLoading ? (
        "Loading..."
      ) : data ? (
        <>


          <CardGrid data={data} />


          <GlobalInfo
            newConfirmed={data?.todayCases}
            newDeaths={data?.todayDeaths}
            newRecovered={data?.todayRecovered}
          />
          <hr />

          {activeCountries.length ? (
            <BarChart countries={activeCountries} />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default App;
