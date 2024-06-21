import React from "react";

interface TextAreaProps {
	rows?: number;
	id?: string;
	value: string;
	disabled?: boolean;
	readOnly?: boolean;
	maxLength?: number;
	cols?: number;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	style?: React.CSSProperties;
	placeholder?: string;
}
export default class TextArea extends React.Component<TextAreaProps> {
	static defaultProps: Partial<TextAreaProps> = {
		rows: 5,
		disabled: false,
		readOnly: false,
	};
	render() {
		return (
			<textarea
				rows={this.props.rows}
				id={this.props.id}
				value={this.props.value}
				disabled={this.props.disabled}
				readOnly={this.props.readOnly}
				maxLength={this.props.maxLength}
				cols={this.props.cols}
				onChange={this.props.onChange}
				className={
					[
						"block",
						"w-full",
						"resize-none",
						"border-0",
						"border-transparent",
						"p-0",
						"pb-2",
						"text-gray-900",
						"placeholder:text-gray-400",
						"focus:shadow-transparent",
						"text-sm",
						"leading-6",
					].join(" ") + this.props.className
				}
				style={this.props.style}
				placeholder={this.props.placeholder}
			></textarea>
		);
	}
}
