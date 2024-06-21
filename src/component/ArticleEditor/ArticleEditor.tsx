import tag from "./tag.svg";
import generateRandomId from "../../utils/generateRandomId";
import TextArea from "../TextArea/TextArea.tsx";

interface ArticleEditorProps {
	// 基础属性
	value: string; // 文本框的值
	placeholder?: string; // 占位符文本
	disabled?: boolean; // 是否禁用
	readOnly?: boolean; // 是否只读
	maxLength?: number; // 最大字符长度
	rows?: number; // 文本框的行数
	cols?: number; // 文本框的列数

	// 事件处理程序
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // 文本改变事件
	onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void; // 获取焦点事件
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void; // 失去焦点事件

	// 样式和类名
	className?: string; // 自定义类名
	style?: React.CSSProperties; // 自定义样式

	// 自定义属性
	autoFocus?: boolean; // 是否自动获取焦点
	resizable?: boolean; // 是否可调整大小
}

export default function ArticleEditor(props: ArticleEditorProps) {
	const id = "label_" + generateRandomId(6);
	return (
		<div>
			<div className="border-b border-b-gray-200 focus-within:border-b-indigo-600 max-h-48 overflow-auto">
				<label htmlFor={id} className="t">
					{props.placeholder}
				</label>
				<TextArea
					rows={150}
					id={id}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
				></TextArea>
			</div>
			<div className="flex justify-between pt-2">
				<div className="flex items-center space-x-6 ">
					<div className="flow-root">
						<button
							type="button"
							className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
						>
							<img
								src={tag}
								alt="tag"
								className="text-gray-300 h-5 w-5 shrink-0 -m-1"
							/>
							<span className="sr-only">选择标签</span>
						</button>
					</div>
				</div>
				{/*<div className="shrink-0">*/}
				{/*	<button*/}
				{/*		type="button"*/}
				{/*		className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 bow bpd"*/}
				{/*	>*/}
				{/*		提交*/}
				{/*	</button>*/}
				{/*</div>*/}
			</div>
		</div>
	);
}
