const generateFakeData = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataset1Data = [300, 400, 600, 800, 1000, 1200, 1400];
    const dataset2Data = [1500, 1300, 1100, 900, 700, 500, 300];
  
    const datasets = [
      {
        label: 'Dataset 1',
        data: dataset1Data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: dataset2Data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ];
  
    return { labels, datasets };
  };
  
  export default generateFakeData;
  