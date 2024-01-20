import { ImageUploader } from "antd-mobile"
import type { ImageUploaderProps } from 'antd-mobile'
type HcyImageUploaderProps = Omit<ImageUploaderProps,"upload"> & {
    request?: {
        url: string,
        method: string,
        params: any,
    }
}
export default (props:HcyImageUploaderProps) => {
    let {request,...rest} = props
    async function uploadImage(file: File) {
        console.log(file)
        return {
            url: URL.createObjectURL(file)
        }
    }
    return <ImageUploader upload={uploadImage} {...rest} />
}