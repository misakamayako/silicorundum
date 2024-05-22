import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root.tsx";
import { lazy } from "react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "article",
				children: [
					{
						path: "upload",
						Component: lazy(() => import("../pages/article/upload")),
					},
				],
			},
		],
	},
]);
export default router;