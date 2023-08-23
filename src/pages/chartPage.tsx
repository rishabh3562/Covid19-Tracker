import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import CountryList from "../components/CountryList";
import GlobalInfo from "../components/GlobalInfo";
import type { ResponseData,ResponseData1 ,Country } from "../types";

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData1| undefined>(undefined);
  const [activeCountries, setActiveCountries] = useState<Country[]>([]);

  const fetchData = async () => {
    const result = await fetch("https://disease.sh/v3/covid-19/all");
    const data: ResponseData1 = await result.json();

    setData(data);
    console.log("data after fetching|:",data);
  };

  useEffect(() => {
    fetchData();

  }, []);

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

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.todayCases}
            newDeaths={data?.todayDeaths}
            newRecovered={data?.todayRecovered}         />
          <hr />

          {activeCountries.length ? (
            <BarChart countries={activeCountries} />
          ) : null}

          {/* <CountryList
            countries={data.affectedCountries}
            onItemClick={onCountryClick}
          /> */}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
