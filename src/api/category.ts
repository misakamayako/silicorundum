import requestServer from "../utils/request";
import { CategoryType } from "../enums.ts";

export const getCategories = (type: CategoryType) => {
	return requestServer.get<ResponseDTO<CategoryDTO[]>>("/category", {
		params: { type },
	});
};

export const addNewCategory = (type: CategoryType, category: string) => {
	return requestServer.post<ResponseDTO<CategoryDTO>>("/category", {
		type,
		category,
	});
};
