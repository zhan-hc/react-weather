import React, { Component } from 'react';
import './searchList.scss'
import { Link } from 'react-router-dom'
export default class searchList extends Component {
  // constructor(props) {
  //   super(props);
  // }
 render(){
   const {likeList} = this.props
   return (
    <ul className='searchList'>
      {/* `?adcode=${city.adcode}` */}
    {
      likeList.length
        ? 
          likeList.map((city, i) => {
            return (
              <li className='searchItem' key={city.adcode}>
                <Link to={{pathname: '/home'}} state={{adcode: city.adcode,city: city.name}}>{city.allName}</Link>
              </li>
            )
          })
        :
        <li className='searchItem' >暂无搜索数据</li>
    }
 </ul>
   )
 }
}
