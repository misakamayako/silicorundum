import React from "react";

export interface ColumnConfig<T> {
	title: React.ReactNode;
	props?: keyof T;
	renderCell?: (row: T, index: number) => React.ReactNode;
	width?: `${number}px`;
}

export interface TableProps<T> {
	dataSource: T[];
	columns: ColumnConfig<T>[];
	strip?: boolean;
}

export default function Table<T>(props: TableProps<T>) {
	return (
		<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
			<thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
				<tr>
					{props.columns.map((it, index) => (
						<th
							className="py-3 px-6 text-left"
							key={index}
							style={{ width: it.width }}
						>
							{it.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="text-gray-600 text-sm font-light">
				{props.dataSource.map((data, row) => (
					<tr
						className="border-b border-gray-200 hover:bg-gray-100"
						key={row}
					>
						{props.columns.map((cell, col) => (
							<td
								className="py-3 px-6 text-left whitespace-nowrap"
								key={`${row}-${col}`}
							>
								{cell.props
									? (data[cell.props] as string)
									: cell.renderCell
										? cell.renderCell(data, row)
										: null}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
