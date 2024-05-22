import { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";

interface SubMenu {
	to: string;
	name: string;
}

interface Menu {
	title: string;
	children: SubMenu[];
}

export default class Root extends Component<void> {
	menu: Menu[] = [
		{
			title: "文章",
			children: [
				{
					name: "上传",
					to: "/article/upload",
				},
			],
		},
	];

	render() {
		return (
			<div
				className={["w-screen", "h-screen", "flex", "flex-row"].join(
					" ",
				)}
			>
				<div className="flex h-screen flex-col justify-between border-e bg-white">
					<div className="px-4 py-6">
						<span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
							Logo
						</span>
						{this.menu.map((first) => (
							<ul className="mt-6 space-y-1" key={first.title}>
								<li>
									<details className="group [&_summary::-webkit-details-marker]:hidden">
										<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
											<span className="text-sm font-medium">
												{" "}
												{first.title}{" "}
											</span>

											<span className="shrink-0 transition duration-300 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										</summary>

										<ul className="mt-2 space-y-1 px-4">
											{first.children.map((sub) => (
												<li key={sub.to}>
													<NavLink
														to={sub.to}
														className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
													>
														{sub.name}
													</NavLink>
												</li>
											))}
										</ul>
									</details>
								</li>
							</ul>
						))}
					</div>
				</div>
				<Outlet />
			</div>
		);
	}
}
