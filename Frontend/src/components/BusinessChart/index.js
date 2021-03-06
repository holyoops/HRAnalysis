import React, { Component, PropTypes } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './index.less';

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
                <p className="label">{`功能调用 ${payload[0].value} 次`}</p>
                </div>
            );
        }

        return null;
    }
});

class BusinessChart extends Component {

    constructor(props) {

        super(props);

        this.state = {
            height : this.props.height,
            width: this.props.width
        };
    }
    componentDidMount() {
        console.log(this.props);
        this.setState({
            height : window.innerHeight,
            width: window.innerWidth - 200
        });
    }

    render () {
        return (
            <div className='SDKFuncCalledChart'>
            <div className='title'>
            <span>{this.props.title}</span>
            </div>
            <div className='chart-container'>
            <ResponsiveContainer>
            <LineChart data={this.props.data} margin={{top: 20, right: 8, left: 40, bottom: 40}} >
            <XAxis dataKey="date" stroke="rgba(0,0,0,0)" tickSize={30} tick={{stroke: "#464C66"}} interval = {2} orientation="top"/>
            <YAxis  stroke="#464C66" tickSize={20} tick={{stroke: "#464C66"}} tickLine={{stroke: "rgba(0,0,0,0)"}}/>
            <CartesianGrid stroke="#272D41" strokeDasharray="3 3"/>
            <Tooltip content={<CustomTooltip/>}/>
            <Line type="monotone" name="功能调用次数" dataKey={this.props.dataKey} stroke="#6496FB" strokeWidth={2} dot={false} height={50}/>
            </LineChart>
            </ResponsiveContainer>
            </div>

            </div>
        );
    }
}
export default BusinessChart;
