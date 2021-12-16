import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = ({ chartData } ) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={400}
      height={200}
      data={chartData}
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
      <Bar dataKey="newDeal" fill="#8884d8"/>
      <Bar dataKey="current" fill="#82ca9d"/>
    </BarChart>
  </ResponsiveContainer>
);

export default Chart;