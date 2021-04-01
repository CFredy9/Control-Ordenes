import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "./redux/modules/cuenta/login";

// maquetado base
import SiderBar from './common/components/layout/Sidebar/Sidebar2';
import Footer from './common/components/layout/Footer/Footer';

import Navbar from "./common/components/layout/Navbar/Navbar2";


class RouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({toggleOpen: !this.state.toggleOpen });
    };


    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    <div>
                            <SiderBar toggleOpen={this.state.toggleOpen} navToggle={this.navToggle} />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <Navbar />
                                    </div> 
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <Footer />
                            </main>
                        </div>}
            />
        );
    }
}

{/*const mstp = state => ({ ...state });

const mdtp = { logOut, getMe };

const PRoute = connect(
    mstp,
    mdtp
)(RouteBase); */}

export default RouteBase;