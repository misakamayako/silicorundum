interface ResponseDTO<T> {
	code: number;
	message: spring;
	data: T;
}
interface STSDTO {
	accessKeyId: string;
	accessKeySecret: string;
	expiration: string;
	securityToken: string;
}
interface CategoryDTO {
	category: string;
	id: number;
	type: number;
}
type PreviewResult = string;
interface ArticleUploadDTO {
	title: string;
	brief: string;
	categories: number[];
	content: string;
}
