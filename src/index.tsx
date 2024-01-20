// import './temp'
import { createRoot } from 'react-dom/client'
import './global.css'
import RouteConfig from './routes' 
import hacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'

//解决某些浏览器不支持 vw单位的一个hack操作,
//主要是postcss插件postcss-viewport-units会在css类里面添加content属性，
//然后buggyfill会操作这个content属性
viewportUnitsBuggyfill.init({
    hacks: hacks
})
createRoot(document.querySelector('#app')!).render(<RouteConfig/>)
console.log(process.env.PROJECT_NAME)