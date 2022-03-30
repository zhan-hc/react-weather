import http from '../utils/http'

/**
 * 获取天气
 */
function getWeatherInfo(cityCode = 440300, extensions = 'all') {
  return http(
    'get',
    `https://restapi.amap.com/v3/weather/weatherInfo?key=484ad16b9fd046e5c322964f9212d421&city=${cityCode}&extensions=${extensions}`
  )
}

export { getWeatherInfo }
