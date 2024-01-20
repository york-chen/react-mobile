import { DatePicker } from "antd-mobile"
import type { DatePickerProps, DatePickerRef } from 'antd-mobile'
import dayjs from 'dayjs'
import { useMemo ,forwardRef, RefObject} from "react"

type HcyDatePickerProps = Omit<DatePickerProps,"onConfirm"|"value"> & {
    format?: string
    onConfirm?:(v:string)=>void
    value?:string
}
type GetOnConfirmPamraType<T> = T extends (value: infer R) => void ? R : never

export default forwardRef((props: HcyDatePickerProps,ref:RefObject<DatePickerRef>) => {
    let { format = "YYYY-MM-DD", value, onConfirm, ...rest } = props
    let transferedValue = useMemo(() => {
        if(value && typeof value === 'string'){
            return new Date(value)
        }
        return undefined
    }, [value])
    function handleConfirm(value: GetOnConfirmPamraType<DatePickerProps['onConfirm']>) {
        onConfirm && onConfirm(dayjs(value).format(format))
    }
    return <DatePicker ref={ref} onConfirm={handleConfirm} value={transferedValue} {...rest}>
        {value =>
            value ? typeof value === 'string' ? value : dayjs(value).format(format) : '请选择日期'
        }
    </DatePicker>
})