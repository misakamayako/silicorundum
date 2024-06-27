import requestServer from "../utils/request";

export const getCategories = (type: number) => {
	return requestServer.get<CategoryDTO[]>("/category", {
		params: { type },
	});
};
