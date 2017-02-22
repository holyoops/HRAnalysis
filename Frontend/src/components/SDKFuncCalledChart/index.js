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
  {date: '1月19日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月20日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月21日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月22日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月23日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月24日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月25日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月26日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月27日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月28日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月29日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月30日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '1月31日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '2月01日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '2月02日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
  {date: '2月03日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
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
          近30天开放平台SDK调用次数
        </div>
        <div className='chart-container'>
          <ResponsiveContainer>
          	<LineChart data={data}
                  margin={{top: 20, right: 20, left: 50, bottom: 40}} >
             <XAxis dataKey="date" stroke="rgba(0,0,0,0)" tickSize={30} tick={{stroke: "#464C66"}} interval = {2} orientation="top"/>
             <YAxis stroke="rgba(0,0,0,0)" tickSize={50} tick={{stroke: "#464C66"}}/>
             <CartesianGrid stroke="#272D41"/>
             <Tooltip content={<CustomTooltip/>}/>
             <Line type="monotone" name="SDK初始化次数" dataKey="SDK" stroke="#343954" strokeWidth={2} dot={false}/>
             <Line type="monotone" name="功能调用次数" dataKey="func" stroke="#425793" strokeWidth={3} dot={false} height={50}/>

            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    );
  }
}
export default SDKFuncCalledChart;
