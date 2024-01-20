import { Picker } from "antd-mobile"
import type { PickerProps } from 'antd-mobile'
import { forwardRef, useMemo } from 'react'
import type { RefObject } from 'react'
import { useFetchRemoteOptions } from '@/hooks'
import type { PickerActions, PickerValue, PickerValueExtend } from "antd-mobile/es/components/picker"

type PickOption = { label: string | number, value: string | number }
type SingleSelectProps = Omit<PickerProps, "columns" | "value" | "onConfirm"> & {
    value?: string | number
    onConfirm?: (v: string | number) => void
    options?: PickOption[]
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default forwardRef((props: SingleSelectProps, ref: RefObject<PickerActions>) => {
    let { request, options, value, onConfirm, ...rest } = props
    let groupData = useFetchRemoteOptions(props)
    let transferedValue = useMemo(() => {
        return value ? Array.isArray(value) ? value : [value] : []
    }, [value])
    function handleConfirm(value: PickerValue[], extend: PickerValueExtend) {
        onConfirm && onConfirm(value[0])
    }
    return <Picker columns={[groupData]} ref={ref} value={transferedValue} onConfirm={handleConfirm} {...rest}>
        {(value) => {
            return value.length ? value[0].label : "请选择"
        }}
    </Picker>
})