import React, { Component } from 'react';
import Line from '../../components/line'
import {getWeatherInfo} from '../../api/common';
import './index.scss'
import { DownFill } from 'antd-mobile-icons'
import { Link } from 'react-router-dom'
import withRouter from '../../utils/withRouter'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      data: {},
      weatherInfo: {},
      init: false,
      currentTemp: {} // 当前天气
    }
  }
 render(){
   const {city, data, weatherInfo, currentTemp} = this.state
   return (
     <div className='index-wrap'>
       <Link to="/city">
         <div className='city'>{city} <DownFill /></div>
       </Link>
       
       <div className="currtemp">{currentTemp.temperature}℃</div>
       {
         weatherInfo.casts ? <div className="daytemp">{`${weatherInfo.casts[0].daytemp}℃/${weatherInfo.casts[0].nighttemp}℃`}</div> : ''
       }
       <div className="weather">{currentTemp.weather}/ 更新时间：{currentTemp.reporttime}</div>
       <div className="info">{`风向：${currentTemp.windpower} | 风力：${currentTemp.winddirection} | 空气湿度：${currentTemp.humidity}%`}</div>
       <div className="other-wrap">
         {
           weatherInfo.casts && weatherInfo.casts.slice(1).map((item, i) => {
             return (
               <div className="other-info" key={i}>
                <div className="other-date">{item.date.slice(5)}</div>
                <div className="other-weather">
                  <img src={require(`../../assets/images/${item.dayweather}.png`)} alt="" width="30" height="30"/>
                  <div className='other-daytemp'>
                    <div>{item.daytemp}℃</div>
                    <div>{item.nighttemp}℃</div>
                  </div>
                </div>
                <div className="weather-text">{item.dayweather}</div>
              </div>
             )
           })
         }
       </div>
       <h3>天气趋势</h3>
       <Line data={data}></Line>
     </div>
   )
 }
 componentDidMount() {
  console.log(this.props,'console.log(this.props.location.query);');
    const _self = this
    if (this.props.location?.state?.adcode) {
      _self.setState({
        city: this.props.location.state.city
      })
      _self.getWeatherInfo(this.props.location.state.adcode)

    }
    else {
        //eslint-disable-next-line
      AMap.plugin('AMap.CitySearch', function () {        
        //eslint-disable-next-line
        var citySearch = new AMap.CitySearch()        
        citySearch.getLocalCity(function (status, result) {          
        console.log(status, result)
        if (status === 'complete' && result.info === 'OK') {
          _self.setState({
            city: result.city
          })
          _self.getWeatherInfo(result.adcode)
        }
        })
      })
    }
 }
 getWeatherInfo(code) {
  const _self = this
  const allWeather = getWeatherInfo(code)
  const baseWeather = getWeatherInfo(code,'base')
  Promise.all([allWeather,baseWeather]).then(res => {
    console.log(res,'weatherInfo==============')
    if (res.every(item => item.info === 'OK')) {
      _self.setState({
        weatherInfo: res[0].forecasts[0],
        data: {
          xdata:res[0].forecasts[0].casts.map(item => item.daytemp),
          ydata: res[0].forecasts[0].casts.map(item => item.date)
        },
        currentTemp: res[1].lives[0]
      })
    }
  })
}
}

export default withRouter(Home)
