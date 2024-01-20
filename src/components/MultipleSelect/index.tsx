import { Selector } from "antd-mobile"
import type { SelectorProps } from 'antd-mobile'
import { useFetchRemoteOptions } from '@/hooks'

type Props = SelectorProps<string | number> & {
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default (props: Props) => {
    let { options, request, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    return <Selector
        options={groupData}
        {...rest}
        multiple
    />
}