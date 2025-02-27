import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	textArea?: false;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	textArea: true;
}

type Props = TextAreaProps | InputProps;
export default function FloatingLabelInput(props: Props) {
	return (
		<label
			className={[
				"relative",
				"block",
				"w-full",
				"rounded-md",
				"border",
				"border-gray-200",
				"shadow-xs",
				"focus-within:border-blue-600",
				"focus-within:ring-1",
				"focus-within:ring-blue-600",
			].join(" ")}
		>
			{props.textArea ? (
				<textarea
					className={[
						"peer",
						"border-none",
						"bg-transparent",
						"placeholder-transparent",
						"focus:border-transparent",
						"focus:outline-hidden",
						"focus:ring-0",
						"w-full",
						"resize-none",
					].join(" ")}
					maxLength={props.maxLength}
					placeholder={props.placeholder}
					rows={props.rows}
					value={props.value}
					onChange={props.onChange}
				/>
			) : (
				<input
					className={[
						"peer",
						"border-none",
						"bg-transparent",
						"w-full",
						"placeholder-transparent",
						"focus:border-transparent",
						"focus:outline-hidden",
						"focus:ring-0",
					].join(" ")}
					maxLength={props.maxLength}
					placeholder={props.placeholder}
					type="text"
					value={props.value}
					onChange={props.onChange}
				/>
			)}
			{props.label ? (
				<span
					className={[
						"pointer-events-none",
						"absolute",
						"start-2.5",
						"top-0",
						"-translate-y-1/2",
						"bg-white",
						"p-0.5",
						"text-xs",
						"text-gray-700",
						"transition-all",
						props.textArea
							? "peer-placeholder-shown:top-4"
							: "peer-placeholder-shown:top-1/2",
						"peer-placeholder-shown:text-sm",
						"peer-focus:top-0",
						"peer-focus:text-xs",
					].join(" ")}
				>
					{props.label}
				</span>
			) : null}
		</label>
	);
}
