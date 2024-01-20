import { useState, useEffect } from 'react'
import axiosRequest from '@/utils/request'

type FetchRemoteOptionsProps<T> = {
    options?: T[],
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
/**
 * 
 * @param props 支持从远端拉取数据
 * @returns 
 */
export function useFetchRemoteOptions<T>(props:FetchRemoteOptionsProps<T>) {
    let { options, request } = props
    let [groupData, setGroupData] = useState<T[]>(request ? [] : (options || []))
    async function fetchRemoteData() {
        let { url, method, params } = request
        let [error, res] = await axiosRequest<T[]>(url, {
            method,
            [method === 'get' ? "data" : "params"]: params
        })
        if (error) {
            return
        }
        setGroupData(res.data)
    }
    useEffect(() => {
        if (request) {
            fetchRemoteData()
        } else {

        }
    }, [])
    return groupData
}