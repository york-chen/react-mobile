import { Radio, Space } from 'antd-mobile'
import type { RadioGroupProps } from 'antd-mobile'
import { useFetchRemoteOptions } from '@/hooks'

type PickOption = { label: string | number, value: string | number }

type Props = RadioGroupProps & {
    options?: PickOption[],
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default (props: Props) => {
    let { request, options, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    return <Radio.Group {...rest}>
        <Space direction='vertical' block>
            {groupData.map(item => <Radio key={item.value} block value={item.value}>{item.label}</Radio>)}
        </Space>
    </Radio.Group>
}