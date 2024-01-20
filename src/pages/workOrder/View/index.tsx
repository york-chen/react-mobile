import JsonToForm from "@/components/JsonToForm"
import { queryFormInfo } from '@/services/workOrder'
import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import { FormItemData } from '@/services/workOrder/type'

export default () => {
    let [formInfo, setFormInfo] = useState<{ formItems: FormItemData[], initialValues: Record<string, any> }>({
        formItems: [],
        initialValues: {}
    })
    let [queryParams] = useSearchParams()
    async function getFormInfo() {
        let [error, result] = await queryFormInfo({
            businessKey: queryParams.get('businessKey'),
            userId: queryParams.get('userId')
        })
        if (error) return
        let data = result.data
        setFormInfo({
            formItems: JSON.parse(data.templateConfigVO.mobileTemplateValue),
            initialValues: JSON.parse(data.formInfoVO.businessValue)
        })
    }
    useEffect(() => {
        getFormInfo()
    }, [])
    return <JsonToForm disabled {...formInfo} />
}