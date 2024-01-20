import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'

function lazyLoad(moduleName: string) {
    const Module = lazy(() => import(`@/pages/${moduleName}`))
    return <Suspense fallback={<div>页面还在加载中</div>}>
        <Module />
    </Suspense>
}
// Route 的 index属性和path只能存在一个
export default () => {
    return <BrowserRouter >
        <Routes>
            <Route path='/' element={<Navigate to="/work-order"/>}></Route>
            <Route path='/work-order'>
                <Route index element={lazyLoad('workOrder/Create')}></Route>
                <Route path='view' element={lazyLoad('workOrder/View')}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}