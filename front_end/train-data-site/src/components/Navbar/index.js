import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
					<NavLink to="/train" activeStyle>
						Train Detail
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
