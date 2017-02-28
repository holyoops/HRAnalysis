import React, { Component } from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';
import './index.less';

class ProgressRing extends Component {

  render () {
  	return (
      <SimplePieChart />
    )
  }
}

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];
const COLORS = ['#0088FE', 'transparent'];

const RADIAN = Math.PI / 180;

const SimplePieChart = React.createClass({
	render () {
  	return (
    	<PieChart width={200} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={78}
          outerRadius={80}
          fill="#8884d8"
          startAngle = {450}
          endAngle = {90}
          strokeWidth={0}
          animationDuration = {2000}
          animationEasing = 'ease-in'
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
})


export default ProgressRing;
