import { Cascader } from "antd-mobile"
import type { CascaderProps } from 'antd-mobile'
import { forwardRef } from 'react'
import type { RefObject } from 'react'
import { useFetchRemoteOptions } from '@/hooks'
import { CascaderActions } from "antd-mobile/es/components/cascader/cascader"

type HcyCascaderProps = CascaderProps & {
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default forwardRef((props: HcyCascaderProps, ref: RefObject<CascaderActions>) => {
    let { request, options, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    return <Cascader ref={ref}
        options={groupData}
        {...rest}
    >
        {items => {
            if (items.every(item => item === null)) {
                return '未选择'
            } else {
                return items.map(item => item?.label ?? '未选择').join('-')
            }
        }}
    </Cascader>
}
)