import React, { useState, useEffect } from "react";
import { TestData } from "./types/types";
import { Chart } from "./components/chart/chart";
import { calculateInstanceTotal } from "./utils/calculateInstanceTotal";

const App: React.FC = () => {
  const [testData, setTestData] = useState<TestData | null>(null);

  useEffect(() => {
    fetch("https://rcslabs.ru/ttrp1.json")
      .then((response) => response.json())
      .then((data: TestData) => {
        setTestData(data);
      });
  }, []);

  if (!testData) return <div>Loading...</div>;

  const { dev, test, prod } = testData;

  const devSum = calculateInstanceTotal(dev);
  const testSum = calculateInstanceTotal(test);
  const prodSum = calculateInstanceTotal(prod);

  return (
    <>
      <Chart chartData={testData} />
      <div className="arrow" id="arrow1">
        <svg width="100" height="50">
          <line
            x1="0"
            y1="25"
            x2="100"
            y2="25"
            stroke="black"
            strokeWidth="2"
          />
          <polygon points="90,15 100,25 90,35" fill="black" />
        </svg>
        <div>{testSum - devSum}</div>
      </div>
      <div className="arrow" id="arrow2">
        <svg width="100" height="50">
          <line
            x1="0"
            y1="25"
            x2="100"
            y2="25"
            stroke="black"
            strokeWidth="2"
          />
          <polygon points="90,15 100,25 90,35" fill="black" />
        </svg>
        <div>{prodSum - testSum}</div>
      </div>
    </>
  );
};

export default App;
