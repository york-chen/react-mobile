import { Popup, TreeSelect as AntdTreeSelect } from 'antd-mobile'
import type { MultipleProps, TreeSelectOption } from 'antd-mobile/es/components/tree-select'
import { useImperativeHandle, ForwardRefRenderFunction, useState, useMemo } from 'react'
import type { HcyTreeSelectRef } from './index'
import { useFetchRemoteOptions } from '@/hooks'

type HcyTreeSelectMutipleProps = MultipleProps & {
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
const HcyTreeSelectMutiple: ForwardRefRenderFunction<HcyTreeSelectRef, HcyTreeSelectMutipleProps> = (props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            open() {
                setVisible(true)
            }
        }
    })
    let { onChange, options, request, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    let [visible, setVisible] = useState(false)
    let memoryDefault = useMemo(() => {
        return getLabelByValue(props.value || [])
    }, [])
    let defaultExpandKeys = useMemo(() => {
        let options = props.options || []
        if (!options.length) {
            return []
        }
        let result = [options[0].value]
        let children = options[0].children
        while (children && children.length) {
            result.push(children[0].value)
            children = children[0].children
        }
        return result
    }, [])
    let [data, setData] = useState<{ value: string[], nodes: TreeSelectOption[] }>(memoryDefault)
    function handleChange(value: string[], nodes: TreeSelectOption[]) {
        onChange && onChange(value, nodes)
        setData({ value, nodes })
    }
    function getLabelByValue(value: string[]): { value: string[], nodes: TreeSelectOption[] } {
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
            nodes
        }
    }
    return <>
        <Popup visible={visible}
            onMaskClick={() => {
                setVisible(false)
            }}
            showCloseButton
            onClose={() => {
                setVisible(false)
            }}
            bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '40vh',
            }}>
            <AntdTreeSelect.Multiple options={groupData} onChange={handleChange} defaultExpandKeys={defaultExpandKeys}  {...rest} />
        </Popup>
        {
            (() => {
                let nodes = data.nodes
                return nodes.length ? nodes.map(node => node.label).join(',') : '未选择'
            })()
        }
    </>
}
export default HcyTreeSelectMutiple
