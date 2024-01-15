import { FC } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill.scss'

interface ITextEditor {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	toolbarOptions?: any[]
}

const TextEditor: FC<ITextEditor> = ({ value, setValue, toolbarOptions }) => {
	const modules = {
		toolbar: toolbarOptions,
	}

	return (
		<ReactQuill
			modules={modules}
			theme='snow'
			value={value}
			onChange={setValue}
		/>
	)
}

export default TextEditor
