import React, { Component } from 'react';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import './index.less';

class ProgressRing extends Component {

  render () {
  	return (
      <SimplePieChart />
    )
  }
}

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];
const COLORS = ['#6496FB', '#343954'];

const RADIAN = Math.PI / 180;

const SimplePieChart = React.createClass({
	render () {
  	return (
      <div className='ProgressRing'>
        <ResponsiveContainer className='ProgressRing-chart'>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              innerRadius={88}
              outerRadius={90}
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
        </ResponsiveContainer>
        <div className='ProgressRing-title'>
          <div className="ProgressRing-count">
            <span className="ProgressRing-number">
              58
            </span>
            <span className="ProgressRing-unit">
              %
            </span>
          </div>
          <div className="ProgressRing-text">
            <span className="ProgressRing-dot">
            </span>
            <span className="ProgressRing-text-content">
              完成成功率
            </span>
          </div>
        </div>
      </div>

    );
  }
})


export default ProgressRing;
