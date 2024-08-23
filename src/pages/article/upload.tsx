import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";
import Select from "../../component/Select/Select.tsx";
import React from "react";
import UploadImageList from "./upload/uploadImage.tsx";
import { addNewCategory, getCategories } from "../../api/category.ts";
import AlertService from "../../utils/AlertService";
import Button from "../../component/Button/Button.tsx";
import {
	createArticle,
	getArticle,
	getImagesOfArticle,
	previewMD,
	updateArticle,
} from "../../api/aritcle.ts";
import ModalService from "../../utils/ModalService/ModalService.tsx";
import withRouter, {
	RouterInfo,
} from "../../component/withRouter/withRouter.tsx";
import OSSService from "../../utils/OSSService/OSSService.ts";
import { OSSBucket } from "../../types/enums.ts";

interface State {
	title: string;
	content: string;
	brief: string;
	categoryChunk: { id: number; text: string }[];
	categories: number[];
	imageList: string[];
	uploading: boolean;
	showPreview: boolean;
	previewContent: string;
}

class Upload extends React.Component<{ router: RouterInfo }, State> {
	state: State = {
		title: "",
		content: "",
		brief: "",
		categoryChunk: [],
		categories: [],
		imageList: [],
		uploading: false,
		showPreview: false,
		previewContent: "",
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
							placeholder="请输入标题"
							value={this.state.title}
							onChange={(e) =>
								this.setState({ title: e.target.value })
							}
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<FloatingLabelInput
							textArea
							aria-label={"简介"}
							label={"简介"}
							maxLength={200}
							placeholder="简介"
							rows={5}
							value={this.state.brief}
							onChange={(e) =>
								this.setState({ brief: e.target.value })
							}
						/>
					</div>
					<div className={"flex flex-row w-full mb-4"}>
						<Select
							addNew={this.addNewCategory.bind(this)}
							multiple={true}
							options={this.state.categoryChunk}
							placeholder={"请选择类型"}
							value={this.state.categories}
							onChange={(value) => {
								this.setState({
									categories: value as number[],
								});
							}}
						></Select>
					</div>
					<div className={"w-full mb-4 relative"}>
						{this.state.showPreview ? (
							<div className={"h-[496px] w-full overflow-auto"}>
								<article
									className="prose prose-neutral"
									dangerouslySetInnerHTML={{
										__html: this.state.previewContent,
									}}
								></article>
							</div>
						) : (
							<FloatingLabelInput
								textArea
								aria-label={"正文"}
								label={"正文"}
								placeholder="正文"
								rows={20}
								value={this.state.content}
								onChange={(e) =>
									this.setState({ content: e.target.value })
								}
							/>
						)}
					</div>
					<div className={"flex w-full mb-4 justify-end"}>
						<Button
							disabled={this.state.uploading}
							loading={this.state.uploading}
							onClick={this.preview.bind(this)}
						>
							{this.state.showPreview ? "关闭" : null}预览
						</Button>
						<Button
							disabled={this.state.uploading}
							loading={this.state.uploading}
							onClick={this.uploadArticle.bind(this)}
						>
							{this.props.router.params.id ? "更新" : "上传"}
						</Button>
					</div>
				</div>
				<div className={"w-72 px-4 shrink-0"}>
					<UploadImageList imgList={this.state.imageList} />
				</div>
			</div>
		);
	}

	async uploadArticle() {
		if (!this.state.title) return AlertService.error("请输入标题");
		if (!this.state.content) return AlertService.error("请输入内容");
		this.setState({ uploading: !this.state.uploading });
		try {
			if (this.props.router.params.id) {
				await updateArticle(parseInt(this.props.router.params.id), {
					id: parseInt(this.props.router.params.id),
					title: this.state.title,
					brief: this.state.brief,
					category: this.state.categories,
					content: this.state.content,
				});
			} else {
				await createArticle({
					title: this.state.title,
					brief: this.state.brief,
					category: this.state.categories,
					content: this.state.content,
				});
			}
			AlertService.info("上传成功");
		} finally {
			this.setState({
				uploading: false,
			});
		}
	}

	async addNewCategory() {
		const newType = await ModalService.prompt("输入类型名称");
		if (newType && newType.trim().length > 0) {
			addNewCategory(1, newType).then(({ data }) => {
				const array = this.state.categoryChunk;
				array.push({
					id: data.data.id,
					text: data.data.category,
				});
				this.setState({
					categoryChunk: structuredClone(array),
					categories: [...this.state.categories, data.data.id],
				});
				AlertService.info("添加成功");
			});
		}
	}

	preview() {
		if (this.state.showPreview) {
			this.setState({
				showPreview: false,
			});
			return;
		}
		this.setState({
			uploading: true,
		});
		previewMD(this.state.content)
			.then(({ data }) => {
				this.setState({
					showPreview: true,
					previewContent: data.data,
				});
			})
			.finally(() => {
				this.setState({
					uploading: false,
				});
			});
	}

	componentDidMount() {
		getCategories(1).then(({ data }) => {
			this.setState({
				categoryChunk: data.data.map((it) => ({
					id: it.id,
					text: it.category,
				})),
			});
		});
		const id = this.props.router.params.id as ID;
		if (id) {
			getArticle(id).then(async ({ data }) => {
				const dto = data.data;
				if (dto.markdownUrl) {
					OSSService.useBucket(OSSBucket.Article);
					const response = await OSSService.get(
						dto.markdownUrl + ".gz",
					);
					const readableStream = new ReadableStream({
						start(controller) {
							controller.enqueue(
								new Uint8Array(response.content),
							);
							controller.close();
						},
					});
					const decompressionStream = new DecompressionStream("gzip");
					const decompressStream =
						readableStream.pipeThrough(decompressionStream);
					const td = new TextDecoderStream();
					const decodedStream = decompressStream.pipeThrough(td);
					const reader = decodedStream.getReader();
					let done: boolean;
					let value: string | undefined;
					let result = "";
					while ((({ done, value } = await reader.read()), !done)) {
						result += value;
					}
					this.setState({
						content: result,
					});
				}
				this.setState({
					title: dto.title,
					brief: dto.brief ?? "",
					categories: dto.category.map((it) => it.id),
				});
			});
			getImagesOfArticle(id).then(({ data }) => {
				this.setState({
					imageList: data.data,
				});
			});
		}
	}
}

export const Component = withRouter(Upload);
