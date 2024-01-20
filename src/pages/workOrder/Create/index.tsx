import JsonToForm from "@/components/JsonToForm";
import { Button, Toast } from "antd-mobile";
import { useEffect, useState } from 'react'
import { getFormTemplateByTemplateId, submitFormContent,addWorkOrder } from '@/services/workOrder'
import { json, useSearchParams } from 'react-router-dom'
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
    async function handleAdd(){
        let [error] = await addWorkOrder({
            templateId: queryParams.get('templateId'),
            requestParameters: JSON.stringify({
                "submitType": "1",
                "submitType_text": "投诉",
                "submitCategory": ["0", "0-0"],
                "submitCategory_text": "网约单车/乱停放",
                "assignDueTime": "2023-12-30",
                "assignRound": 1,
                "submitTime": "2023-12-27 12:36",
                "submitSource": "0",
                "submitSource_text": "市长公开电话",
                "submitArea": ["0", "0-0", "0-0-0"],
                "submitArea_text": "成都市/高新区/天华社区",
                "submitter": "张阿三",
                "submitterPhone": "18933333333",
                "submitterGender": "1",
                "submitterGender_text": "男",
                "submitTitle": "我要投诉",
                "submitContent": "家门口的共享单车乱停放，影响我们小区的形象",
                "submitAddress": "成都市高新区环球中心乐天玛特三楼",
                "submitAnnex": "https://pic4.zhimg.com/80/v2-94a0bc8b2774dc9a4dc9a7a01981d30b_720w.webp,https://pic4.zhimg.com/80/v2-3776cc7979af7a68fadb22958fb65ba3_720w.webp"
            }),
            "processDefinitionKey": "AD682E3FA480"
        })
        console.log(error);
    }
    useEffect(() => {
        getFormTemplate()
    }, [])
    return  <>
        <Button onClick={handleAdd} color='primary' size='large'>
            提交
        </Button>
         <JsonToForm formItems={formTemplate} onFinish={handleSubmit} footer={
        <Button block type='submit' color='primary' size='large'>
            提交
        </Button>
    } />
    </>
}