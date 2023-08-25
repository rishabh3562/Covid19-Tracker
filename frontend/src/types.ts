export type Country = {
  Country: string;
  CountryCode: string;
  Date: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: unknown;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type GlobalData = {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type ResponseData = {
  Countries: Country[];
  Date: string;
  Global: GlobalData;
  ID: string;
  Message: string;
};

export type ResponseData1 = {
  active: number;
  activePerOneMillion: number;
  affectedCountries: number;
  cases: number;
  casesPerOneMillion: number;
  critical: number;
  criticalPerOneMillion: number;
  deaths: number;
  deathsPerOneMillion: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  population: number;
  recovered: number;
  recoveredPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  updated: number;
};

// types.ts

export interface CountryInfo {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

export interface CountryData {
  updated: number;
  country: string;
  countryInfo: CountryInfo;
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
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

