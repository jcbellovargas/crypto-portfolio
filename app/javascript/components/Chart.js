import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, CartesianGrid, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

function createChartData(market_data) {
  return market_data.map((item, i) => {
    return { time: item["date"], amount: item["price"]}
  });
}

function calculateChartDomain(data) {
  const max = Math.max.apply(Math, data.map(function(o) { return o.amount; }))
  const min = Math.min.apply(Math, data.map(function(o) { return o.amount; }))
  return [Math.floor(min), Math.ceil(max)];
}
export default function Chart(props) {
  const data = createChartData(props.market_data);
  const domain = calculateChartDomain(data);
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Price</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} domain={domain} >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              USD ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}