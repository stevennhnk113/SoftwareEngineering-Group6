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
	Button,
} from 'reactstrap';
import App from "../../App";
import UsercontrollerObj from "../../Controller/UserController";
import { HomeView } from "../HomeView";

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

		this.SetupUserDropdown();
	}

	async SetupUserDropdown() {
		var users = await UsercontrollerObj.GetNonManagerUsers();

		this.setState({ users: users })
	}

	// toggle() {
	// 	// this.setState({
	// 	// 	isOpen: !this.state.isOpen
	// 	// });
	// }

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

	logout() {
		App.changeToLoginView();
	}

	onUserMenuClick(id) {
		HomeView.SetUserToDisplayCalendar(id);
		console.log(id)
	}

	render() {
		var user = UsercontrollerObj.GetUser();
		var userName = user.firstName + " " + user.lastName;


		var dropdowncontainer;
		// Dropdown
		if (user.position == "Manager" && this.state.users != null) {
			var dropdownItems = [];
			dropdownItems.push(
				<DropdownItem  key={user.id} onClick={() => this.onUserMenuClick(user.id)}>
					Yourself
				</DropdownItem >
			);

			this.state.users.forEach(element => {
				dropdownItems.push(
					<DropdownItem key={element.id} onClick={() => this.onUserMenuClick(element.id)}>
						{element.firstName + " " + element.lastName}
					</DropdownItem >
				)
			});

			dropdowncontainer = (
				<Dropdown group isOpen={this.state.dropdownOpen} size="lg" toggle={this.toggle}>
					<DropdownToggle caret>
						Choose user
					</DropdownToggle>
					<DropdownMenu>
						{dropdownItems}
					</DropdownMenu>
				</Dropdown>
			);
		}

		return (
			<Navbar color="light" light expand="md">
				<NavbarBrand onClick={this.goToHomeView} href="#">Schedule Me, {userName}</NavbarBrand>
				{dropdowncontainer}
				<Collapse isOpen={this.state.isOpen} navbar>
				<Button>Request Time Off</Button>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink onClick={this.goToProfileView} href="#">My Profile</NavLink>
							<NavLink onClick={this.logout} href="#">Log out</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}