import { Global, css } from "@emotion/react";
import { useQuery } from 'react-query';
import { useEffect, useState } from "react";
import type { Country,CardGridProps } from "../../types";
import CardComponent from "../../components/CardComponet";
import { fetchData } from "../../utils/apis";



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
  const [activeCountries, setActiveCountries] = useState<Country[]>([]);
  return (
    <div>
      
      {isLoading ? (
        "Loading..."
      ) : data ? (
        <>
          <CardGrid data={data} />
          <hr />
        </>
      ) : null}
    </div>
  );
};

export default App;
