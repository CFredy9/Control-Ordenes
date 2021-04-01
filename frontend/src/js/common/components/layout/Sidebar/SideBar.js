import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }
    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                {/*<div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-dark">
                       {/* <a  href="#/home" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                {/*<img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                alt="Logo" /> 
                            </div>
                        </a> 
                        <a  className="toggle-sidebar d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div> */}
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">   

                    <li className="nav-item">
                            <span className="nav-link"></span>
                            <span className="nav-link"></span>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/home" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">home</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/producto" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Productos</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/compra-producto" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Comprar</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/reportes" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Reportes</span>
                            </NavLink>
                        </li>
                        
                      
                        <li className="nav-item">
                            <Link to="/" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Cerrar Sesión</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
