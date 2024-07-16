import requestServer from "../utils/request";

const resource = "article";

export function previewMD(content: string) {
	const action = "preview";
	return requestServer.post<ResponseDTO<PreviewResult>>(
		`/${resource}/${action}`,
		{ content },
	);
}

export function createArticle(articleUploadDTO: ArticleUploadDTO) {
	return requestServer.post<ResponseDTO<void>>(
		`/${resource}`,
		articleUploadDTO,
	);
}

export function deleteArticle(id: number) {
	return requestServer.delete<ResponseDTO<void>>(`/${resource}/${id}`);
}

export function queryArticle(page: number, pageSize: number) {
	return requestServer.get<ResponseDTO<PageResultDTO<QueryResultArticleDTO>>>(
		resource,
		{
			params: {
				page,
				pageSize,
			},
		},
	);
}

export function getArticle(id: number) {
	return requestServer.get<ResponseDTO<ArticleDetailDTO>>(
		`/${resource}/${id}`,
	);
}
