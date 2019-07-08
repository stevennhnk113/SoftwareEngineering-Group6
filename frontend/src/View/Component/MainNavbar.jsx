import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import App from "../../App";

export class MainNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};

		this.goToProfileView = this.goToProfileView.bind(this);
		this.goToHomeView = this.goToHomeView.bind(this);
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	goToProfileView() {
		App.changeToProfileView();
	}

	goToHomeView() {
		App.changeToHomeView();
	}

	render() {
		return (
			<Navbar color="light" light expand="md">
				<NavbarBrand onClick={this.goToHomeView} href="#">Schedule Me</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink onClick={this.goToProfileView} href="#">My Profile</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}