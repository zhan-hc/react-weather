import React from 'react';
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default class Line extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.state = 
  // }
  // componentWillMount(){
  //   //主题的设置要在willmounted中设置
  //   // echarts.registerTheme('Imooc',echartTheme);
  // }
  getOption =()=> {
    let option = {
      tooltip:{
        trigger:'axis',
      },
      xAxis:{
        data:this.props.data.ydata,
        show: false
      },
      yAxis:{
        type:'value',
        show: false
      },
      series:[
        {
          name:'温度',
          type:'line',
          data:this.props.data.xdata,
          itemStyle: {normal: {label: {
            show: true,
            formatter: function(params){
              return (params.value) + '℃';
            },
            color: ['#fff']
          }}},
          lineStyle: {
            normal: {
              color: "#fff"
            }
          },
          color: ['#fff']
        }
      ]
    }
   return option
  }
  render(){
    return(
      <div>
        {
          Object.keys(this.props.data).length ? <ReactEcharts option={this.getOption()} style={{height:'260px'}}/> : ''
        }
      </div>
    )
  }
}