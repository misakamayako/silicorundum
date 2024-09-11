import { ReactNode, useContext } from "react";
import { WidthProducer } from "./FormProducer.ts";
import FormItemStyle from "./FormItem.module.less";

interface Props {
	label: string | undefined;
	children: ReactNode;
}
function FormItem(props: Props) {
	const width = useContext(WidthProducer);
	return (
		<div className={FormItemStyle.FormItem}>
			<label className={FormItemStyle.FormItemLabel} style={{ width }}>
				{props.label}
			</label>
			<div className={FormItemStyle.FormItemContent}>
				{props.children}
			</div>
		</div>
	);
}
export default FormItem;
