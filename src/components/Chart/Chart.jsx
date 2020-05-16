import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, LineData, country, chart }) => {
  let dailyData = LineData;
  console.log(LineData)
  
  console.log("Here is Daily Data", dailyData);
  console.log("Chart is now", chart);
  console.log("country is:", country)
  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Cases',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, 
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Cases', 'Deaths', 'Recovered'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'],
              data: [confirmed, recovered, deaths],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );
  console.log("Line Data in Chart",LineData)
  const error = <div> 'There is no historical data for this country' </div>

  return (
    <div className={styles.container}>
      {chart==="Bar" ? barChart: lineChart}
      {LineData.length===0 && chart !=="Bar" ? error : ''}
      
    </div>
  );
};

export default Chart;