import React, { useState, useEffect } from 'react';
import { TestData } from './types/types';
import { Chart } from './components/SiteAnalysisChart/Chart';

const App: React.FC = () => {
  const [testData, setTestData] = useState<TestData | null>(null);

  useEffect(() => {
    fetch('https://rcslabs.ru/ttrp1.json')
      .then((response) => response.json())
      .then((data: TestData) => {
        setTestData(data);
      });
  }, []);

  if (!testData) return <div>Loading...</div>;

  return (
    <>
      <Chart chartData={testData} />
    </>
  );
};

export default App;
