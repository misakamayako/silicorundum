import { ReactNode } from "react";
import { WidthProducer } from "./FormProducer";

interface Props {
	width: number | `${number}`;
	children: ReactNode;
}

function Form(props: Props) {
	const innerWidth = props.width;
	return (
		<form>
			<WidthProducer.Provider value={innerWidth}>
				{props.children}
			</WidthProducer.Provider>
		</form>
	);
}
export default Form;
