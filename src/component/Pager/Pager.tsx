import { useMemo } from "react";
import PagerStyle from "./Pager.module.less";
import Button from "../Button/Button.tsx";

interface PagerProps {
	total: number;
	pageSize: number;
	current: number;
	onChange: (page: number) => void;
	className?: string | undefined;
}

export default function Pager(props: PagerProps) {
	const totalPage = useMemo(() => {
		return Math.ceil(props.total / props.pageSize) || 1;
	}, [props.total, props.pageSize]);
	const pageRange: number[] = useMemo(() => {
		if (totalPage === 1) {
			return [];
		}
		const min = Math.max(2, props.current - 2);
		const max = Math.min(totalPage - 1, props.current + 2);
		const result: number[] = new Array(max - min);
		for (let i = min; i <= max; i++) {
			result[i - min] = i;
		}
		return result;
	}, [props, totalPage]);

	function getStyle(page: number, ...style: string[]): string {
		if (page === props.current) {
			return `${PagerStyle.current} ${style.join(" ")}`;
		} else {
			return style.join(" ");
		}
	}

	return (
		<nav className={[PagerStyle.Pager, props.className].join(" ")}>
			<div>共{props.total}条</div>
			<div>
				<Button
					className={PagerStyle.pagination}
					disabled={props.current === 1}
				>
					&lt;
				</Button>
				<Button className={getStyle(1, PagerStyle.pagination)}>
					1
				</Button>
				{pageRange.length !== 0 ? (
					<Button
						className={[
							PagerStyle.pagination,
							PagerStyle.dot,
							PagerStyle.left,
						].join(" ")}
					/>
				) : null}
				{pageRange.map((p) => (
					<Button
						className={getStyle(p, PagerStyle.pagination)}
						key={p}
					>
						{p}
					</Button>
				))}
				{pageRange.length !== 0 ? (
					<Button
						className={[
							PagerStyle.pagination,
							PagerStyle.dot,
							PagerStyle.right,
						].join(" ")}
					/>
				) : null}
				{totalPage > 1 ? (
					<Button
						className={getStyle(totalPage, PagerStyle.pagination)}
					>
						{totalPage}
					</Button>
				) : null}
				<Button
					className={[PagerStyle.pagination, PagerStyle.next].join(
						" ",
					)}
				>
					&gt;
				</Button>
			</div>
		</nav>
	);
}
