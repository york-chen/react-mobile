import JsonToForm from "@/components/JsonToForm";
import { Button, Toast } from "antd-mobile";
import { useEffect, useState } from 'react'
import { getFormTemplateByTemplateId, submitFormContent } from '@/services/workOrder'
import { useSearchParams } from 'react-router-dom'
import type { FormItemData } from '@/services/workOrder/type'

export default () => {
    let [queryParams] = useSearchParams();
    let [formTemplate, setFormTemplate] = useState<FormItemData[]>([])
    async function handleSubmit(value: Record<string, any>) {
        let [error] = await submitFormContent({
            templateId: queryParams.get('templateId'),
            businessValue: value,
            userId: queryParams.get('userId')
        })
        if (error) {
            return
        }
        Toast.show({
            icon: 'success',
            content: '保存成功',
        })
    }
    async function getFormTemplate() {
        let [error, result] = await getFormTemplateByTemplateId({
            templateId: queryParams.get('templateId'),
            source: 'mobile'
        })
        if (error) {
            return
        }
        setFormTemplate(JSON.parse(result.data.mobileTemplateValue))
    }
    useEffect(() => {
        // getFormTemplate()
    }, [])
    return <JsonToForm formItems={formTemplate} onFinish={handleSubmit} footer={
        <Button block type='submit' color='primary' size='large'>
            提交
        </Button>
    } />
}