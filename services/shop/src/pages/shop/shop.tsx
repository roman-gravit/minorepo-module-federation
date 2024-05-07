import React from 'react'
import { Link } from 'react-router-dom';
import { shopRoutes } from "@packages/shared/src/routes/shop";

const Shop = () => {
  return (
	<h1>
		Shop
		<br />
		<Link to={shopRoutes.second}>goto Second page</Link>
	</h1>
  )
}

export default Shop;