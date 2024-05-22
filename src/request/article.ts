import { ArticleUploadDTO } from "./types/request/article.ts";
import instance from "./index.ts";
const resourceType = "article"
export function createArticle(articleUploadDTO:ArticleUploadDTO){
	return instance.post<void>(resourceType,articleUploadDTO)
}