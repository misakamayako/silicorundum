import React from "react";
import Table, { ColumnConfig } from "../../component/Table/Table.tsx";
import { deleteArticle, queryArticle } from "../../api/aritcle.ts";
import operationStyle from "../../styles/operation.module.less";
import Pager from "../../component/Pager/Pager.tsx";
import ModalService from "../../utils/ModalService/ModalService.tsx";
import AlertService from "../../utils/AlertService";
import { NavLink } from "react-router-dom";
import Form from "../../component/InlineForm/Form.tsx";
import FormItem from "../../component/InlineForm/FormItem.tsx";
import FloatingLabelInput from "../../component/Input/FloatingLabelInput.tsx";
import Button from "../../component/Button/Button.tsx";

interface State extends TableDisplayData<ArticleBrief> {
	loading: boolean;
	title: string;
	categories: number[];
}

class ArticleIndex extends React.Component<NonNullable<unknown>, State> {
	state: State = {
		title: "",
		categories: [],
		page: 1,
		pageSize: 10,
		total: 0,
		list: [],
		loading: false,
	};
	columns: ColumnConfig<ArticleBrief>[] = [
		{
			title: "名称",
			props: "title",
		},
		{
			title: "今日新增浏览",
			props: "views",
		},
		{
			title: "创建时间",
			props: "createdAt",
		},
		{
			title: "最后更新时间",
			props: "updatedAt",
		},
		{
			title: "最新版本号",
			props: "version",
			width: "124px",
		},
		{
			title: "操作",
			width: "240px",
			renderCell: (data) => {
				return (
					<>
						<div className={operationStyle.operation}>查看</div>
						<NavLink
							className={operationStyle.operation}
							to={`/article/${data.id}/edit`}
							type={"div"}
						>
							修改
						</NavLink>
						<div
							className={operationStyle.operation}
							onClick={this.confirmDelete.bind(this, data)}
						>
							删除
						</div>
					</>
				);
			},
		},
	];

	render() {
		return (
			<div className={"p-4"}>
				<Form width={96}>
					<FormItem label={"标题"}>
						<FloatingLabelInput
							value={this.state.title}
							onChange={(e) =>
								this.setState({ title: e.target.value })
							}
						/>
					</FormItem>
					<Button
						loading={this.state.loading}
						onClick={this.search.bind(this, 1, 10)}
					>
						查找
					</Button>
				</Form>
				<Table columns={this.columns} dataSource={this.state.list} />
				<Pager
					className={"mt-2"}
					current={this.state.page}
					pageSize={this.state.pageSize}
					total={this.state.total}
					onChange={this.search.bind(this)}
				></Pager>
			</div>
		);
	}
	search(page?: number, pageSize?: number) {
		this.setState({
			loading: true,
		});
		const tPage = page ?? 1;
		const tPageSize = pageSize ?? this.state.pageSize;
		queryArticle(tPage, tPageSize, this.state.title)
			.then(({ data }) => {
				this.setState({
					list: data.data.list,
					page: tPage,
					pageSize: tPageSize,
					total: data.data.totalElements,
				});
			})
			.finally(() => {
				this.setState({
					loading: false,
				});
			});
	}
	confirmDelete(article: ArticleBrief) {
		ModalService.confirm(`是否删除${article.title}`).then((flag) => {
			if (flag) {
				deleteArticle(article.id).then(() => {
					AlertService.info("操作成功");
					const page =
						this.state.list.length === 1
							? Math.max(1, this.state.page - 1)
							: this.state.page;
					this.search(page, this.state.pageSize);
				});
			}
		});
	}
	componentDidMount() {
		this.search();
	}
}

export const Component = ArticleIndex;
