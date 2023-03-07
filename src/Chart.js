import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  return (
    <div className="pie-chart">
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
