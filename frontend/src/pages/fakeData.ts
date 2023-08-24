// fakeData.ts

interface DataType {
    [date: string]: number;
  }
  
  export interface FakeApiData {
    cases: DataType;
    deaths: DataType;
    recovered: DataType;
  }
  
  export const fakeApiData: FakeApiData = {
    cases: {
      "1/22/20": 557,
      "1/23/20": 657,

      "2/28/20": 84152,
      "2/29/20": 86023,
    },
    deaths: {
      "1/22/20": 17,
      "1/23/20": 18,

      "2/28/20": 2858,
      "2/29/20": 2941,
    },
    recovered: {
      "1/22/20": 28,
      "1/23/20": 30,
     
      "2/28/20": 3622,
      "2/29/20": 3724,
    },
  };
  
  