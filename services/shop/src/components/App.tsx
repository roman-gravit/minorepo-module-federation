import { Outlet } from "react-router-dom";

export const App = () => {
	return (
		<div>
			<h1>Shop Module</h1>
			<div>hello shop1</div>
			<Outlet/>
		</div>
  	)
}