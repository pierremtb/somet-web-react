import React from 'react';
import SubHeader from 'material-ui/Subheader';
import { LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function WorkoutChart(props) {
  function getXAxisTypeName(name) {
    if (name === 'distance') {
      return 'Distance';
    }
    return 'Durée';
  }


  const max = props.data.activity.sessions[0][`max_${props.yAxisField}`];

  if (!props.data.records[0][props.yAxisField]
    && !props.data.records[10][props.yAxisField]
    && !props.data.records[20][props.yAxisField]) {
    return <div></div>;
  }

  return (
    <div>
      <SubHeader>{props.title}</SubHeader>
      {props.details}
      <ResponsiveContainer height={300}>
        <LineChart
          data={props.data.records.filter((record, index) => {
            if (index % props.reduceFactor === 0) {
              return max ? record[props.yAxisField] < max : true;
            }
            return false;
          })}
        >
          <XAxis
            dataKey={props.xAxisType}
            label={getXAxisTypeName(props.xAxisType)}
            tickFormatter={(data) => {
              if (props.xAxisType === 'distance') {
                return parseInt(data / 1000, 10);
              }
              return data;
            }}
          />
          <YAxis
            stroke={props.color}
            label={props.title}
            domain={['dataMin', 'dataMax']}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            type="step"
            dataKey={props.yAxisField}
            stroke={props.color}
            dot={false}
            activeDot
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

WorkoutChart.propTypes = {
  xAxisType: React.PropTypes.oneOf(['distance', 'duration']),
  color: React.PropTypes.string,
  data: React.PropTypes.object,
  details: React.PropTypes.element,
  reduceFactor: React.PropTypes.number,
  title: React.PropTypes.string,
  yAxisField: React.PropTypes.oneOf(['altitude', 'speed', 'power',
    'heart_rate', 'cadence', 'temperature']),
};
