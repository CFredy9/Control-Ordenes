import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link, NavLink} from "react-router-dom";

const defaultAvatar = require("assets/img/avatar-placeholder.png");


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { navToggle, logOut, user } = this.props;

        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar ">
                <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless" />
                </div>
                <ul className="border-left flex-row navbar-nav">
                            {/*<NavLink to="/login" exact className="nav-link " activeClassName={'active'}>
                                <span>Iniciar Sesión</span>
                                </NavLink>*/}
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownItem color="light" caret className="nav-item-dropdown border-0">
                            <img className="user-avatar rounded-circle mr-3"
                                 src={defaultAvatar}
                                 alt="User Avatar" />
                            <Link tabIndex="0"
                                   to="/login">
                                    Iniciar Sesión
                                </Link>
                        </DropdownItem>
                    </Dropdown>
                </ul>
                <nav className="nav">
                    <a  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
                        onClick={ navToggle } >
                        <i className="material-icons"></i>
                    </a>
                </nav>
            </nav>
        );
    }
}

export default Navbar;