import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "article",
				children: [
					{
						path: "index",
						lazy: () => import("../pages/article/index.tsx"),
					},
					{
						path: "upload",
						lazy: () => import("../pages/article/upload.tsx"),
					},
					{
						path: ":id/edit",
						lazy: () => import("../pages/article/upload.tsx"),
					},
				],
			},
		],
	},
]);
export default router;
