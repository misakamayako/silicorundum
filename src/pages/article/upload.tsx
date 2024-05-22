import { Component } from "react";
import { CategoryDTO } from "../../request/types/response/categories.ts";
import { Loading } from "../../component/Loading/Loading.tsx";
import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";

interface State {
	title: string;
	content: string;
	categoryChunk: CategoryDTO[];
	categories: number[];
	imageList: string[];
	uploading: boolean;
}

export default class Upload extends Component<State> {
	state: State = {
		title: "",
		content: "",
		categoryChunk: [],
		categories: [],
		imageList: [],
		uploading: false,
	};

	render() {
		return (
			<div
				className={
					"h-full w-full flex flex-row divide-x divide-cyan-400"
				}
			>
				<div className={"grow px-4 flex h-full flex-col"}>
					<div className={"flex flex-row w-full my-4"}>
						<FloatingLabelInput
							placeholder="请输入标题"
							aria-label={"标题"}
							label={"标题"}
							maxLength={80}
							value={this.state.title}
							onChange={(e) =>
								this.setState({ title: e.target.value })
							}
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<FloatingLabelInput
							aria-label={"新增类型"}
							placeholder="新增类型"
							label={"新增类型"}
							maxLength={20}
							onKeyDown={this.tryAddNew.bind(this)}
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<div
							className={"w-16 shrink-0"}
							style={{ lineHeight: "40px" }}
						>
							类型
						</div>
						<div className="flex-wrap">
							{this.state.categoryChunk.map((it) => (
								<>
									<input
										type={"checkbox"}
										value={it.id.toString()}
										key={it.id}
										className={"my-2"}
									/>
									<span className={"whitespace-nowrap"}>
										{it.category}
									</span>
								</>
							))}
						</div>
					</div>
					<div
						className={
							"flex flex-row w-full mb-4 grow-1 overflow-auto"
						}
						style={{ colorScheme: "dark" }}
					>
						<div
							className={"w-16 shrink-0"}
							style={{ lineHeight: "40px" }}
						>
							正文
						</div>
						<div className={"h-full w-full overflow-auto"}>
							<textarea
								value={this.state.content}
								onChange={(e) =>
									this.setState({ content: e.target.value })
								}
							></textarea>
						</div>
					</div>
					<div className={"flex w-full mb-4 flex-row-reverse"}>
						<button
							color="primary"
							disabled={this.state.uploading}
							onClick={this.uploadArticle.bind(this)}
						>
							{this.state.uploading ? <Loading /> : "上传"}
						</button>
					</div>
				</div>
				<div
					className={"w-72 px-4 shrink-0"}
					onDrop={this.uploadFile.bind(this)}
					onDragOver={(e) => e.preventDefault()}
				></div>
			</div>
		);
	}

	tryAddNew() {}

	uploadArticle() {}

	uploadFile() {}
}
