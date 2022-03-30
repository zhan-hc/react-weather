import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import City from './pages/city/index'
import Home from './pages/home/index'
import { HashRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/city" element={<City />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
;(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = '16px'
    } else {
      /*
        DOMContentLoaded DOM元素加载完成就触发
        load 页面所有资源加载触发
      */
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 100
  function setRemUnit() {
    var rem = docEl.clientWidth / 100
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
