import { Loading } from "../../component/Loading/Loading.tsx";
import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";
import Select from "../../component/Select/Select.tsx";
import React from "react";
import UploadImageList from "./upload/uploadImage.tsx";
import { getCategories } from "../../api/category.ts";

interface State {
	title: string;
	content: string;
	categoryChunk: { id: number; text: string }[];
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
							aria-label={"标题"}
							label={"标题"}
							maxLength={80}
							onChange={(e) =>
								this.setState({ title: e.target.value })
							}
							placeholder="请输入标题"
							value={this.state.title}
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<FloatingLabelInput
							aria-label={"简介"}
							label={"简介"}
							maxLength={200}
							onKeyDown={this.tryAddNew.bind(this)}
							placeholder="简介"
							rows={5}
							textArea
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<Select
							addNew={this.addNewCategory.bind(this)}
							multiple={true}
							onChange={(value) => {
								this.setState({
									categories: value as number[],
								});
							}}
							options={this.state.categoryChunk}
							placeholder={"请选择类型"}
							value={this.state.categories}
						></Select>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<FloatingLabelInput
							aria-label={"正文"}
							label={"正文"}
							onChange={(e) =>
								this.setState({ content: e.target.value })
							}
							placeholder="正文"
							rows={20}
							textArea
							value={this.state.content}
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
				<div className={"w-72 px-4 shrink-0"}>
					<UploadImageList />
				</div>
			</div>
		);
	}

	tryAddNew() {}

	uploadArticle() {}

	addNewCategory() {}
	componentDidMount() {
		getCategories(1).then(({ data }) => {
			this.setState({
				categoryChunk: data.map((it) => ({
					id: it.id,
					text: it.category,
				})),
			});
		});
	}
}

export const Component = Upload;
