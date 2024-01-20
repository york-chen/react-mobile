import {Cascader, CascaderRef, Checkbox, DatePicker, DatePickerRef, Form, ImageUploader, Input, Picker, PickerRef, Radio, Selector, Space, Stepper, TextArea} from 'antd-mobile'
import { PickerDate } from 'antd-mobile/es/components/date-picker/util'
import { RefObject } from 'react'

export default ()=>{
    function dayjs(value: PickerDate) {
        throw new Error('Function not implemented.')
    }

    return <Form>
        <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
    <Input placeholder='请输入姓名' />
</Form.Item>
<Form.Item name='address' label='地址' help='详情地址'>
    <TextArea placeholder='请输入地址' />
</Form.Item>
<Form.Item
    name='birthday'
    label='生日'
    trigger='onConfirm'
    onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
        datePickerRef.current?.open()
    }}
>
    <DatePicker precision='second'>
        {value =>
            value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '请选择日期'
        }
    </DatePicker>
</Form.Item>
<Form.Item
    name='department'
    label='部门'
    trigger='onConfirm'
    onClick={(e, pickerRef: RefObject<PickerRef>) => {
        pickerRef.current?.open()
    }}
>
    <Picker columns={departments}>
        {(value) => {
            return value.length ? value[0].label : "请选择"
        }}
    </Picker>
</Form.Item>
<Form.Item
    name='foods'
    label='三餐'
    trigger='onChange'
>
    <Selector
        options={mutipleOptions}
        multiple
        onChange={(arr, extend) => console.log(arr, extend.items)}
    />
</Form.Item>
<Form.Item
    name='cascader'
    label='级联选择器'
    trigger='onConfirm'
    onClick={(e, cascaderRef: RefObject<CascaderRef>) => {
        cascaderRef.current?.open()
    }}
>
    <Cascader
        options={cascaderoptions}
    >
        {items => {
            if (items.every(item => item === null)) {
                return '未选择'
            } else {
                return items.map(item => item?.label ?? '未选择').join('-')
            }
        }}
    </Cascader>
</Form.Item>
<Form.Item
    name='images'
    label='上传图片'
    trigger="onChange"
>
    <ImageUploader upload={uploadImage}
    />
</Form.Item>
<Form.Item name='favoriteFruits' label='喜爱的水果'>
    <Checkbox.Group
    >
        <Space direction='vertical' block>
            <Checkbox block value='apple'>苹果</Checkbox>
            <Checkbox block value='orange'>橘子</Checkbox>
            <Checkbox block value='banana'>香蕉</Checkbox>
        </Space>
    </Checkbox.Group>
</Form.Item>
<Form.Item name='favoriteFruit' label='喜爱的水果'>
    <Radio.Group
    >
        <Space direction='vertical' block>
            <Radio block value='apple'>苹果</Radio>
            <Radio block value='orange'>橘子</Radio>
            <Radio block value='banana'>香蕉</Radio>
        </Space>
    </Radio.Group>
</Form.Item>
<Form.Item
    initialValue={0}
    rules={[
        {
            max: 5,
            min: 1,
            type: 'number',
        },
    ]}
    name='stepper-demo'
    label='数量'
>
    <Stepper />
</Form.Item>
<Form.Item name='treeSelect' label='树形选择框'
    trigger='onChange'
    onClick={(e, cascaderRef: RefObject<CascaderRef>) => {
        cascaderRef.current?.open()
    }}>
    <HcyTreeSelect.Mutiple
        options={treeSelectOptions}
        onChange={(value, nodes) => {
            console.log(value, nodes)
        }} >
        {
            (value, nodes) => {
                return nodes.length ? nodes.map(node => node.label).join(',') : '未选择'
            }
        }
    </HcyTreeSelect.Mutiple>
</Form.Item>
<Form.Item name='treeSelect11' label='树形单选选择框' rules={[{ required: true }]}
    trigger='onChange'
    onClick={(e, cascaderRef: RefObject<CascaderRef>) => {
        cascaderRef.current?.open()
    }}>
    <HcyTreeSelect
        options={treeSelectOptions}
        onChange={(value, nodes) => {
            console.log(value, nodes)
        }} >
        {
            (value, nodes) => {
                if (!nodes.options.length) {
                    return '未选择'
                }
                let lastOption = nodes.options[nodes.options.length - 1]
                if (lastOption.children && lastOption.children.length) {
                    return '未选择'
                }
                return lastOption.label
            }
        }
    </HcyTreeSelect>
</Form.Item>
<Form.Item name='richTextEditor' label='富文本编辑器'
    trigger='onChange'>
    <RichTextEditor />
</Form.Item>
    </Form>
}