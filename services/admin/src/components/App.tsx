import { Outlet } from "react-router-dom";

export const App = () => {
	return (
		<div>
			<h1>Admin Module</h1>
			<Outlet/>
		</div>
  	)
}