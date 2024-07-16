import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ReactNode } from "react";
import Button from "../Button/Button.tsx";
import { ModalAction } from "../../types/enums.ts";

export interface ModalProps {
	open: boolean;
	onClose: (action: ModalAction) => void;
	children: ReactNode;
	title?: ReactNode;
	showCancel?: boolean;
	showClose?: boolean;
}

export function Modal(props: ModalProps) {
	if (props.open) {
		return (
			<div className="fixed inset-0 bg-black opacity-50 z-50 flex content-center justify-center">
				<Dialog
					className="relative z-50"
					open={true}
					onClose={() => props.onClose(ModalAction.close)}
				>
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
						<DialogPanel className="space-y-4 border bg-white p-6 w-[480px]">
							<DialogTitle className="font-bold">
								{props.title}
							</DialogTitle>
							{props.children}
							<hr />
							<div className="flex justify-end">
								{props.showCancel ? (
									<Button
										onClick={() =>
											props.onClose(ModalAction.cancel)
										}
									>
										取消
									</Button>
								) : null}
								{props.showClose === false ? null : (
									<Button
										onClick={() =>
											props.onClose(ModalAction.confirm)
										}
									>
										确认
									</Button>
								)}
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</div>
		);
	} else {
		return null;
	}
}
