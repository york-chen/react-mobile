import { Popup, TreeSelect as AntdTreeSelect } from 'antd-mobile'
import type { TreeSelectOption, TreeSelectProps } from 'antd-mobile/es/components/tree-select'
import { forwardRef, useImperativeHandle, ForwardRefRenderFunction, useState, useMemo } from 'react'
import { attachPropertiesToComponent } from '@/utils/attach-properties-to-component'
import Mutiple from './Mutiple'
import { useFetchRemoteOptions } from '@/hooks'

export type HcyTreeSelectRef = {
    open: () => void
}

type TreeSelectData = {
    value: string[]
    extend: {
        options: TreeSelectOption[]
    }
}
type HcyTreeSelectProps = TreeSelectProps & {
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
const HcyTreeSelect: ForwardRefRenderFunction<HcyTreeSelectRef, HcyTreeSelectProps> = (props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            open() {
                setVisible(true)
            }
        }
    })
    //可以用useMemo来计算出treeselect应该使用的值
    // console.log(getNames(props.options,'A11'))
    let { onChange, options, request, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    let [visible, setVisible] = useState(false)
    let memoryDefault = useMemo(() => {
        return getLabelByValue(props.value || [])
    }, [])
    let [data, setData] = useState<TreeSelectData>(memoryDefault)
    function handleChange(value: string[], extend: {
        options: TreeSelectOption[];
    }) {
        let realData = { value, extend }
        //这个onChange函数实际上是被Form.Item组件代理过之后的函数，我们调用这个函数会影响到rc-form-field组件设置form表单的值
        //利用这个特性拦截form表单设置值
        onChange && onChange(realData.value, realData.extend)
        setData(realData)
    }
    function handlePopupClose() {
        setVisible(false)
        if (!props.value || !props.value.length) {
            onChange && onChange(undefined, undefined)
            return
        }
        let val = props.value.slice(props.value.length - 1)
        let result = getLabelByValue(val)
        if (result.extend.options[0].children && result.extend.options[0].children.length) {
            onChange && onChange(undefined, undefined)
            return
        }
    }
    function getLabelByValue(value: string[]): TreeSelectData {
        let collect = props.options, nodes: TreeSelectOption[] = [];
        function search(arr: TreeSelectOption[]) {
            if (nodes.length === value.length) {
                return
            }
            for (let option of arr) {
                if (value.includes(option.value)) {
                    nodes.push(option)
                    if (nodes.length === value.length) {
                        break
                    }
                }
                if (option.children && option.children.length) {
                    search(option.children)
                }
            }

        }
        search(collect)
        return {
            value,
            extend: { options: nodes }
        }
    }
    return <>
        <Popup visible={visible}
            onMaskClick={() => {
                handlePopupClose()
            }}
            onClose={() => {
                setVisible(false)
            }}
            bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '40vh',
            }}>
            <AntdTreeSelect options={groupData} onChange={handleChange} {...rest as TreeSelectProps} />
        </Popup>
        {
            (() => {
                let nodes = data.extend
                if (!nodes.options.length) {
                    return '未选择'
                }
                let lastOption = nodes.options[nodes.options.length - 1]
                if (lastOption.children && lastOption.children.length) {
                    return '未选择'
                }
                return lastOption.label
            })()
        }
    </>
}
const ForwardHcyTreeSelect = forwardRef(HcyTreeSelect)
export default attachPropertiesToComponent(ForwardHcyTreeSelect, {
    Mutiple: forwardRef(Mutiple)
})

function getNames(data: TreeSelectOption[], val: string): TreeSelectData {
    for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].value === val) {
            return { value: [data[i].value], extend: { options: [data[i]] } }
        }
        if (data[i] && data[i].children) {
            let d = getNames(data[i].children, val)
            if (d) {
                return { value: [data[i].value].concat(d.value), extend: { options: [data[i]].concat(d.extend.options) } }
            }
        }
    }
}