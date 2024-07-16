import {
	Location,
	NavigateFunction,
	Params,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { ComponentType } from "react";

type WithRouterComponent<P = unknown> = ComponentType<
	P & { router: RouterInfo }
>;

export interface RouterInfo {
	navigate: NavigateFunction;
	location: Location<unknown>;
	params: Readonly<Params<string>>;
}

export default function withRouter(Component: WithRouterComponent) {
	function ComponentWithRouterProp(props: object) {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();
		const routerInfo: RouterInfo = {
			location,
			navigate,
			params,
		};
		return <Component {...props} router={routerInfo} />;
	}

	return ComponentWithRouterProp;
}
