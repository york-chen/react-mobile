import { useRef, forwardRef, useImperativeHandle } from 'react'
import type { ForwardRefRenderFunction } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './editor.css'

type RichTextEditorRef = {

}

const RichTextEditor: ForwardRefRenderFunction<RichTextEditorRef, ReactQuillProps> = (props, ref) => {
    useImperativeHandle(ref, () => {
        return {

        }
    })
    let { defaultValue, onChange, ...rest } = props
    const contentRef = useRef(defaultValue)
    const handleChange: ReactQuillProps['onChange'] = (...rest) => {
        onChange && onChange(...rest);
        contentRef.current = rest[0];
    }
    return <ReactQuill theme='snow' defaultValue={contentRef.current} onChange={handleChange} {...rest}/>
}
export default forwardRef(RichTextEditor)