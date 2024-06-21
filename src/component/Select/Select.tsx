import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PlusIcon,
} from "@heroicons/react/20/solid";
import { useMemo } from "react";
import type { MouseEvent } from "react";

interface BaseSelection {
	id: number;
	text: string;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface SelectProps<T extends BaseSelection> {
	value: number | number[];
	options: T[];
	onChange: (value: number | number[]) => void;
	multiple?: boolean;
	addNew?: () => void;
}

export default function Select<T extends BaseSelection>({
	value,
	options,
	onChange,
	addNew,
	multiple = false,
}: SelectProps<T>) {
	const translator = useMemo(() => {
		const hashMap = new Map<number, string>();
		options.forEach((it) => {
			hashMap.set(it.id, it.text);
		});
		return hashMap;
	}, [options]);
	const text = useMemo(() => {
		if (multiple) {
			if (Array.isArray(value) && value.length > 0) {
				const result: string[] = [];
				value.forEach((it) => {
					result.push(translator.get(it)!);
				});
				return result.join();
			} else {
				return "请选择";
			}
		} else {
			return options.find((it) => it.id === value)?.text ?? "请选择";
		}
	}, [value, translator]);
	const handleIfAdd = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		addNew!();
	};
	const filterNotNull = (newValue: number | number[]) => {
		if (!onChange) return;
		if (Array.isArray(newValue)) {
			onChange(newValue.filter((it) => it !== null));
		} else {
			newValue !== null && onChange(newValue);
		}
	};
	return (
		<Listbox value={value} onChange={filterNotNull} multiple={multiple}>
			{({ open }) => (
				<>
					<div className="relative mt-2 w-full">
						<ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
							<span className="flex items-center">
								<span className="ml-3 block truncate">
									{text}
								</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</ListboxButton>

						<Transition
							show={open}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{options.map((selection) => (
									<ListboxOption
										key={selection.id}
										className={({ focus }) =>
											classNames(
												focus
													? "bg-indigo-600 text-white"
													: "",
												!focus ? "text-gray-900" : "",
												"relative cursor-default select-none py-2 pl-3 pr-9",
											)
										}
										value={selection.id}
									>
										{({ selected, focus }) => (
											<>
												<div className="flex items-center">
													<span
														className={classNames(
															selected
																? "font-semibold"
																: "font-normal",
															"ml-3 block truncate",
														)}
													>
														{selection.text}
													</span>
												</div>

												{selected ? (
													<span
														className={classNames(
															focus
																? "text-white"
																: "text-indigo-600",
															"absolute inset-y-0 right-0 flex items-center pr-4",
														)}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</ListboxOption>
								))}
								{addNew ? (
									<ListboxOption
										className={({ focus }) =>
											classNames(
												focus
													? "bg-indigo-600 text-white"
													: "",
												!focus ? "text-gray-900" : "",
												"relative cursor-default select-none py-2 pl-3 pr-9",
											)
										}
										value={null}
										onClick={handleIfAdd}
									>
										{({ focus }) => (
											<>
												<div className="flex items-center">
													<span
														className={classNames(
															"font-normal",
															"ml-3 block truncate",
														)}
													>
														新增
													</span>
												</div>

												<span
													className={classNames(
														focus
															? "text-white"
															: "text-indigo-600",
														"absolute inset-y-0 right-0 flex items-center pr-4",
													)}
												>
													<PlusIcon
														className="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											</>
										)}
									</ListboxOption>
								) : null}
							</ListboxOptions>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
