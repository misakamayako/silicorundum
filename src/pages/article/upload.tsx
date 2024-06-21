import { CategoryDTO } from "../../request/types/response/categories.ts";
import { Loading } from "../../component/Loading/Loading.tsx";
import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";
import Select from "../../component/Select/Select.tsx";
import React from "react";

interface State {
	title: string;
	content: string;
	categoryChunk: CategoryDTO[];
	categories: number[];
	imageList: string[];
	uploading: boolean;
}

class Upload extends React.Component<NonNullable<unknown>, State> {
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
					"h-full w-full flex flex-row divide-x divide-gray-300"
				}
			>
				<div className={"grow px-4 flex h-full flex-col overflow-auto"}>
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
							aria-label={"简介"}
							placeholder="简介"
							label={"简介"}
							maxLength={200}
							onKeyDown={this.tryAddNew.bind(this)}
							rows={5}
							textArea
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<Select
							value={this.state.categories}
							onChange={(value) => {
								this.setState({
									categories: value as number[],
								});
							}}
							options={[
								{ id: 1, name: "123", text: "123" },
								{ id: 2, name: "1243", text: "1234" },
							]}
							multiple={true}
							addNew={this.addNewCategory.bind(this)}
						></Select>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<FloatingLabelInput
							aria-label={"正文"}
							placeholder="正文"
							label={"正文"}
							rows={20}
							textArea
							value={this.state.content}
							onChange={(e) =>
								this.setState({ content: e.target.value })
							}
						/>
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

	uploadFile(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer?.files;
		if (!file || file.length === 0) return;
	}
	addNewCategory() {}
}

export const Component = Upload;
