import { createRoot, Root } from "react-dom/client";
import { Modal, ModalProps } from "../../component/Modal/Modal.tsx";
import { ReactNode, useState } from "react";
import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";
import { ModalAction } from "../../types/enums.ts";

interface ModalConfig {
	showCancel?: boolean;
	children?: ReactNode;
	title: string;
}

class ModalService {
	readonly #element?: HTMLDivElement;
	readonly #root?: Root;
	#showing: boolean = false;

	show(config: ModalConfig): Promise<void> {
		if (this.#showing) {
			return Promise.reject("当前已有弹窗，不能新增了");
		}
		return new Promise<void>((resolve, reject) => {
			const modalProps: ModalProps = {
				children: config.children,
				onClose: (action: ModalAction) => {
					switch (action) {
						case ModalAction.cancel:
							reject("cancel");
							break;
						case ModalAction.close:
							reject("");
							break;
						case ModalAction.confirm:
							resolve();
					}
					this.#showing = false;
					modalProps.open = false;
					this.#render(modalProps);
				},
				title: config.title,
				showCancel: config.showCancel,
				open: true,
			};
			this.#showing = true;
			this.#render(modalProps);
		});
	}

	constructor() {
		if (typeof window === "undefined") {
			return;
		}
		this.#element = document.createElement("div");
		document.body.append(this.#element);
		this.#root = createRoot(this.#element);
	}

	#render(modalProps: ModalProps) {
		this.#root?.render(
			<Modal {...modalProps}>{modalProps.children}</Modal>,
		);
	}

	prompt(title: string): Promise<string> {
		return new Promise((resolve, reject) => {
			let value = "";
			const CurrentInstance = (
				<PrivateInput setValue={(it) => (value = it)} />
			);
			const config: ModalConfig = {
				children: CurrentInstance,
				showCancel: true,
				title: title,
			};
			this.show(config)
				.then(() => resolve(value))
				.catch((e) => {
					reject(e);
				});
		});
	}
	confirm(title: string): Promise<boolean> {
		return new Promise((resolve) => {
			const config: ModalConfig = {
				showCancel: true,
				title: title,
			};
			this.show(config)
				.then(() => resolve(true))
				.catch(() => {
					resolve(false);
				});
		});
	}
}

export default new ModalService();

interface ModalInputInterface {
	setValue(value: string): void;
}
const PrivateInput = (props: ModalInputInterface) => {
	const [value, setValue] = useState("");

	return (
		<FloatingLabelInput
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
				props.setValue(e.target.value); // 这里应传入新的 value 而不是旧的
			}}
		/>
	);
};
