import type { ReactNode } from "react";
import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import SilicorundumButtonStyle from "./Button.module.css";
interface Props {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
}
export default function Button(props: Props) {
	return (
		<button
			className={SilicorundumButtonStyle.SilicorundumButton}
			disabled={props.disabled}
			type={"button"}
			onClick={() => {
				props.disabled ? void 0 : props.onClick();
			}}
		>
			{props.loading === true ? (
				<ArrowPathIcon
					className={["animate-spin", "cursor-pointer", "w-4"].join(
						" ",
					)}
				/>
			) : null}
			<span className={"flex-shrink-0"}>{props.children}</span>
		</button>
	);
}
