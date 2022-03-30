import { Component } from "react";
import { SearchBar } from 'antd-mobile'
import './index.scss'
import SearchList from './components/searchList'
class City extends Component {
  constructor() {
    super();
    this.state = {
      hotCity: ['深圳市', '广州市', '上海市', '厦门市', '北京市', '大连市', '珠海市', '杭州市'],
      cityData: {}, // 所有的省市区
      cityList: [],
      likeList: [],
      showSearch: false
    }
    this.handleSearch = this.debounce(this.handleSearch,1000)
  }
  render() {
    const {hotCity, likeList, showSearch} = this.state
    return (
      <div className="city-wrap">
        <SearchBar placeholder='请输入内容' onChange={(val) => this.handleSearch(val)}/>
        {/* onBlur={() => {this.setState({showSearch: false})}} */}
        <h3>热门城市</h3>
        <ul className="hot-city">
          {hotCity.map((item,i) => {
            return <li className="hot-item" key={i}>{item}</li>
          })}
        </ul>
        {
          showSearch ? <SearchList likeList={likeList}></SearchList> : ''
        }
      </div>
        
    )
  }
  componentDidMount() {
    const _self = this

    //eslint-disable-next-line
    AMap.plugin('AMap.DistrictSearch', function () {
      //eslint-disable-next-line
      var districtSearch = new AMap.DistrictSearch({
        // 关键字对应的行政区级别，country表示国家
        level: 'country',
        //  显示下级行政区级数，1表示返回下一级行政区
        subdistrict: 2
      })
      // 搜索所有省/直辖市信息
      districtSearch.search('中国', function(status, result) {
        // 查询成功时，result即为对应的行政区信息
        if (status === 'complete' && result.info === 'OK') {
          console.log(status, result)
          const cityData = {}
          const cityList = []
          result.districtList[0].districtList.forEach(province => {
            let provinceName = province.name
            if (province.districtList) {
              province.districtList.forEach(city => {
                const cityName = city.name
                city.allName = `${cityName}，` + provinceName
                cityList.push(city)
                if (cityData.hasOwnProperty(provinceName)) {
                  cityData[provinceName].push(city)
                } else {
                  cityData[provinceName] = [cityName]
                }
              })
            }
          })
          _self.setState({
            cityData,
            cityList
          })
          console.log(cityList, 'cityData')
        }
      })
    })
  }

  handleSearch(keyword) {
    if (keyword) {
      this.setState({
        likeList: this.state.cityList.filter(item => item.allName.indexOf(keyword) >= 0),
        showSearch: true
      })
    } else {
      this.setState({
        likeList: [],
        showSearch: false
      })
    } 
  }

  debounce(func, wait=0) {
    if (typeof func !== 'function') {
      throw new TypeError('need a function arguments')
    }
    let timeid = null;
    let result;
    return function() {
      let context = this;
      let args = arguments;
      if (timeid) {
        clearTimeout(timeid);
      }
      timeid = setTimeout(function() {
        result = func.apply(context, args);
      }, wait);
      return result;
    }
  }
}

export default City