import { Checkbox, Space } from 'antd-mobile'
import type { CheckboxGroupProps } from 'antd-mobile'
import {useFetchRemoteOptions} from '@/hooks'

type PickOption = { label: string | number, value: string | number }

type Props = CheckboxGroupProps & {
    options?: PickOption[],
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default (props: Props) => {
    let { options, request, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    console.log(groupData)
    return <Checkbox.Group {...rest}>
        <Space direction='vertical' block>
            {
                groupData.map(item => <Checkbox key={item.value} block value={item.value}>{item.label}</Checkbox>)
            }
        </Space>
    </Checkbox.Group>
}