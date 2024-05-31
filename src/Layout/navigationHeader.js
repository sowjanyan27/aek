import { render } from "@testing-library/react";
import React, { Component } from "react";

class NavigationHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-master">
                <div className="container">
                    <a className="navbar-brand me-5" href="#" style={{ color: "white"}}><i className="fa fa-stethoscope logo_scope" aria-hidden="true"></i>AEK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Potential Mangement <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <ul className="sub-menu list-unstyled drop-down-slide">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Blog</a>
                                        <ul className="child-sub-menu list-unstyled drop-down-slide">
                                            <li><a href="#"><span>Price list</span></a></li>
                                            <li><a href="#"><span>Price list</span></a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Price list</a></li>
                                    <li><a href="#">Contact us</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Branch Operations <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link">Medicine Master<i className="fa fa-angle-down" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <p className="m-0">Logout</p>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}
export default NavigationHeader

