import requestServer from "../utils/request";
type CateGoryType = 1 | 2;
export const getCategories = (type: CateGoryType) => {
	return requestServer.get<ResponseDTO<CategoryDTO[]>>("/category", {
		params: { type },
	});
};
export const addNewCategory = (type: CateGoryType, category: string) => {
	return requestServer.post<ResponseDTO<CategoryDTO>>("/category", {
		type,
		category,
	});
};
