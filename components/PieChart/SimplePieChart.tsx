import React, {PureComponent} from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const SimplePieChart = ({data}) => {

  const preventNegativeValues = (data: any): any => {
    return data.map((item: any) => {
      return {
        name: item.name,
        current: item.current > 0 ? item.current : 0,
        newDeal: item.newDeal > 0 ? item.newDeal : 0,
      }
    });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={preventNegativeValues(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="current" fill="#8884d8"/>
        <Bar dataKey="newDeal" fill="#82ca9d"/>
      </BarChart>
    </ResponsiveContainer>
  );
}


export default SimplePieChart;