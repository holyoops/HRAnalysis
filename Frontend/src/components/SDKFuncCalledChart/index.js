import React, { Component, PropTypes } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './index.less';

const data = [
  {date: '1月05日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月06日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月07日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月08日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月09日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月10日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月11日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月12日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月13日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月14日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月15日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月16日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月17日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月18日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
];

const CustomTooltip  = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="label">{`功能调用 ${payload[1].value} 次`}</p>
          <p className="label">{`SDK初始化 ${payload[0].value} 次`}</p>
        </div>
      );
    }

    return null;
  }
});

class SDKFuncCalledChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height : this.props.height,
      width: this.props.width
    };
  }
  componentDidMount() {
    this.setState({
      height : window.innerHeight,
      width: window.innerWidth - 200
    });
  }

	render () {
  	return (
      <div className='SDKFuncCalledChart'>
        <div className='title'>
          <span>近14天开放平台SDK调用次数</span>
        </div>
        <div className='chart-container'>
          <ResponsiveContainer>
            <LineChart data={data} margin={{top: 20, right: 8, left: 80, bottom: 40}} >
              <XAxis dataKey="date" stroke="rgba(0,0,0,0)" tickSize={30} tick={{stroke: "#464C66"}} interval = {0} orientation="top"/>
              <YAxis  stroke="#464C66" tickSize={60} tick={{stroke: "#464C66"}} tickLine={{stroke: "rgba(0,0,0,0)"}}/>
              <CartesianGrid stroke="#272D41" strokeDasharray="3 3"/>
              <Tooltip content={<CustomTooltip/>}/>
              <Line type="monotone" name="SDK初始化次数" dataKey="SDK" stroke="#29B5A5" strokeWidth={2} dot={false}/>
              <Line type="monotone" name="功能调用次数" dataKey="func" stroke="#6496FB" strokeWidth={2} dot={false} height={50}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    );
  }
}
export default SDKFuncCalledChart;
