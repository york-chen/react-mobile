import axiosRequest from '@/utils/request'
import type {WorkOrderFormTemplateVo,WorkOrderFormInfoVo} from './type'
/**
 * 根据form表单的templateId查询模板表单的内容
 * @param params 
 * templateId integer 必需
 * source string 请求来源 可选  示例值:pc/mobile
 * @returns 
 */
export async function getFormTemplateByTemplateId(params: { templateId: number|string, source?: string }) {
    return axiosRequest<WorkOrderFormTemplateVo>('/templateConfig/find', {
        method: 'get',
        params
    })
}

/**
 * 提交json表单
 * @param data 
 * templateId string 模板id
 * businessValue array[string] 必需 表单具体内容的键值对
 * userId string 发起人id 必需
 * params array[string] 参数的设置 可选
 * @returns 
 */
export async function submitFormContent(data: { templateId: number|string, businessValue: Record<string,any>,userId:string,params?:string[] }) {
    return axiosRequest('/formInfo/add', {
        method: 'post',
        data
    })
}

/**
 * 提交json表单
 * @param data 
 * templateId string 模板id
 * businessValue array[string] 必需 表单具体内容的键值对
 * userId string 发起人id 必需
 * params array[string] 参数的设置 可选
 * @returns 
 */
export async function addWorkOrder(data: { templateId: number|string, requestParameters: string,processDefinitionKey:string }) {
    return axiosRequest('/complaintWorkOrder/add', {
        method: 'post',
        data
    })
}


/**
 * 查询表单详情，包含了表单里面的值
 * @param params 
 * businessKey string 必需
 * userId string 必需
 * @returns 
 */
export async function queryFormInfo(params: { businessKey: string,userId:string }) {
    return axiosRequest<WorkOrderFormInfoVo>('/formInfo/find', {
        method: 'get',
        params
    })
}