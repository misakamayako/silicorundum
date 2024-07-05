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
