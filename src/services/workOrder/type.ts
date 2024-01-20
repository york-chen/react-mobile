export type WorkOrderFormTemplateVo = {
    templateKey: string
    pcTemplateValue: string
    mobileTemplateValue: string

}

export type FormItemData = {
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

export type WorkOrderFormInfoVo = {
    templateConfigVO:{
        pcTemplateValue:string
        mobileTemplateValue:string
    }
    formInfoVO:{
        templateId:string
        businessValue:string
        processInstanceId:string
    }
}