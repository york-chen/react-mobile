import axios, { AxiosRequestConfig } from 'axios'

type RestfulResult<T> = {
    code:string
    message?:string
    data:T,
    status:boolean
}
const instance = axios.create({
    timeout: 10 * 1000,
    baseURL: '/api/'
})

instance.interceptors.request.use(config => {
    return config
})
instance.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})
export default function<T> (url: string, options: AxiosRequestConfig):Promise<[any,RestfulResult<T>]> {
    options.url = url
    return new Promise((resolve,reject)=>{
        instance.request(options).then(res=>{
            resolve([null,res.data as RestfulResult<T>])
        }).catch(error=>{
            resolve([error,null])
        })
    })
}