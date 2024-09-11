import { CategoryType } from "../enums.ts";

declare global {
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
		type: CategoryType;
	}

	type PreviewResult = string;

	interface ArticleUploadDTO {
		id?: number;
		title: string;
		brief: string;
		category: number[];
		content: string;
	}

	interface PageResultDTO<T> {
		list: T[];
		totalPages: number;
		totalElements: number;
		currentPage: number;
		currentPageSize: number;
	}

	interface QueryResultArticleDTO {
		id: number;
		title: string;
		markdownUrl?: string;
		htmlUrl?: string;
		brief?: string;
		author?: string;
		createdAt?: string; // ISO 8601 format: "yyyy-MM-ddTHH:mm:ss"
		updatedAt?: string; // ISO 8601 format: "yyyy-MM-ddTHH:mm:ss"
		category: CategoryDTO[];
	}

	interface TableDisplayData<T> {
		page: number;
		pageSize: number;
		total: number;
		list: T[];
	}

	interface ArticleDetailDTO {
		id: number;
		title: string;
		brief?: string;
		content: string;
		categories: number[];
		imgList: string[];
	}

	type ID = number | `${number}`;

	interface ArticleBrief {
		id: number;
		title: string;
		createdAt?: string; // ISO 8601 format: "yyyy-MM-ddTHH:mm:ss"
		updatedAt?: string; // ISO 8601 format: "yyyy-MM-ddTHH:mm:ss"
		version: number;
		views: number;
	}
}
