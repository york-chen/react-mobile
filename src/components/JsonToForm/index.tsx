import type { RefObject } from 'react'
import { Fragment, useEffect } from 'react'
import {
    Form,
    Input,
    TextArea,
    Stepper
} from 'antd-mobile'
import type { FormProps } from 'antd-mobile'
import HcyTreeSelect from '@/components/TreeSelect'
import RichTextEditor from '@/components/RichTextEditor'
import CheckBoxGroup from '@/components/CheckBoxGroup'
import RadioGroup from '@/components/RadioGroup'
import MultipleSelect from '@/components/MultipleSelect'
import SingleSelect from '@/components/SingleSelect'
import HcyCascader from '@/components/HcyCascader'
import HcyImageUploader from '@/components/HcyImageUploader'
import HcyDatePicker from '@/components/HcyDatePicker'

interface JsonToFormProps extends FormProps {
    formItems?: FormItemData[]
}
type FormItemData = {
    type: string
    key: string
    label: string
    rules?: Record<string, any>[]
    trigger?: string
    props?: Record<string, any>,
    request?: {
        url: string,
        method: string,
        params: any,
    },
}
export default (props: JsonToFormProps) => {
    let { formItems = [], initialValues, ...rest } = props
    const [form] = Form.useForm()
    function jsonDataToFormEle(data: FormItemData) {
        switch (data.type) {
            case 'Title':
                return <Form.Header>{data.label}</Form.Header>
            case 'SubTitle':
                return null
            case 'Input':
                return <Input {...data.props} />
            case 'TextArea':
                return <TextArea rows={1} {...data.props} />
            case 'InputNumber':
                return <Stepper {...data.props} />
            case 'Checkbox':
                return <CheckBoxGroup {...data.props} request={data.request} />
            case 'Radio':
                return <RadioGroup {...data.props} />
            case 'Select':
                {
                    return <SingleSelect {...data.props} />
                }
            case 'SelectMultiple':
                {
                    let { options = [], ...rest } = data.props
                    return <MultipleSelect options={options} {...rest} />
                }
            case 'DatePicker':
                {
                    return <HcyDatePicker {...data.props} />
                }
            case 'TreeSelect':
                {
                    let { options = [], ...rest } = data.props
                    return <HcyTreeSelect options={options} request={data.request} {...rest} />
                }
            case 'TreeSelectMutiple':
                let { options = [], ...rest } = data.props
                {
                    return <HcyTreeSelect.Mutiple options={options} {...rest} />

                }
            case 'Cascader':
                {
                    let { options = [], ...rest } = data.props
                    return <HcyCascader options={options} {...rest} />
                }
            case 'ImageUploader':
                return <HcyImageUploader {...data.props} />
            case 'RichTextEditor':
                return <RichTextEditor />
            default:
                return null

        }
    }
    function generatorTriggerFn(type: string) {
        if (['DatePicker', 'Select', 'Cascader', 'TreeSelect', 'TreeSelectMutiple'].includes(type)) {
            return {
                onClick: (e: React.MouseEvent, ref: RefObject<{ open: () => void }>) => {
                    ref.current.open()
                }
            }
        }
        return {}
    }
    useEffect(() => {
        form.setFieldsValue(initialValues)
    })
    return (
        <Form
            form={form}
            {...rest}
        >
            {
                formItems.map(item => {
                    if (['Title', 'SubTitle'].includes(item.type)) {
                        return <Fragment key={item.key}>
                            {jsonDataToFormEle(item)}
                        </Fragment>
                    } else {
                        let obj = generatorTriggerFn(item.type)
                        return <Form.Item key={item.key} {...obj} name={item.key} label={item.label} {...(item.trigger ? { trigger: item.trigger } : {})} rules={item.rules}>
                            {jsonDataToFormEle(item)}
                        </Form.Item>
                    }
                })
            }
        </Form>
    )
}