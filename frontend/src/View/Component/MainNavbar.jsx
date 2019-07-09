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
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import App from "../../App";
import UsercontrollerObj from "../../Controller/UserController";

export class MainNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			dropdownOpen: false,
			users: null
		};

		this.goToProfileView = this.goToProfileView.bind(this);
		this.goToHomeView = this.goToHomeView.bind(this);
	}

	async SetupUserDropdown() {
		var users = await UsercontrollerObj.GetNonManagerUsers();

		this.setState({ users: users })
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

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		var user = UsercontrollerObj.GetUser();
		var userName = user.firstName + " " + user.lastName;

		// Dropdown
		if (user.position == "Manager" && this.state.users != null) {
			var dropdownItems = [];
			dropdownItems.push(
				<DropdownToggle caret id={user.id}>
					Yourself
				</DropdownToggle>
			);

			this.state.users.forEach(element => {
				dropdownItems.push(
					<DropdownToggle caret id={element.id}>
						element.firstName + " " + element.lastName
					</DropdownToggle>
				)
			});

			var dropdowncontainer = (
				<Dropdown group isOpen={this.state.dropdownOpen} size="lg" toggle={this.toggle}>
					{dropdownItems}
				</Dropdown>
			);
		}

		return (
			<Navbar color="light" light expand="md">
				<NavbarBrand onClick={this.goToHomeView} href="#">Schedule Me, {userName}</NavbarBrand>

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