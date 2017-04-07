import React, { Component, PropTypes } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';
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
        props.ajax = ajax({
            url: __GLOBAL('HOST_URL') + 'getLastTwoWeeksData'
        });

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.ajax.then(xhr => {
            this.setState({
                data: JSON.parse(xhr.response).data
            })
        },
        function (e) {
            console.log(JSON.stringify(e));
            return
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
                        <LineChart data={this.state.data} margin={{top: 20, right: 8, left: 80, bottom: 40}} >
                            <XAxis dataKey="formatedDate" stroke="rgba(0,0,0,0)" tickSize={30} tick={{stroke: "#464C66"}} interval = {0} orientation="top"/>
                            <YAxis  stroke="#464C66" tickSize={60} tick={{stroke: "#464C66"}} tickLine={{stroke: "rgba(0,0,0,0)"}}/>
                            <CartesianGrid stroke="#272D41" strokeDasharray="3 3"/>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Line type="monotone" name="SDK初始化次数" dataKey="SDKInitCount" stroke="#29B5A5" strokeWidth={2} dot={false}/>
                            <Line type="monotone" name="功能调用次数" dataKey="othersCount" stroke="#6496FB" strokeWidth={2} dot={false} height={50}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
export default SDKFuncCalledChart;
