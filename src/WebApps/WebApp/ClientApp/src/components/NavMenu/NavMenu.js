import React, {useState} from "react";
import {
    Button,
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import "./NavMenu.css";
import BasketNavItemCounter from "./NavItems/BasketNavItemCounter";

const NavMenu = (props) => {
    debugger;
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <Navbar
                className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                container
                light
            >
                <NavbarBrand tag={Link} to="/">
                    eShop
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse
                    className="d-sm-inline-flex flex-sm-row-reverse"
                    isOpen={!collapsed}
                    navbar
                >
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className={`text-dark ${location.pathname === "/" ? "active" : ""}`}
                                     to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link}
                                     className={`text-dark ${location.pathname === "/products" ? "active" : ""}`}
                                     to="/products">
                                Products
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link}
                                     className={`text-dark ${location.pathname === "/basket" ? "active" : ""}`}
                                     to="/basket">
                                <BasketNavItemCounter count={props.selectedProducts.length}/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {props.isLoggedIn
                                ? <Button onClick={props.logoutHandler} color="link">Logout</Button>
                                : <NavLink tag={Link}
                                           className={`text-dark ${location.pathname === "/login" ? "active" : ""}`}
                                           to="/login">Login</NavLink>}
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );

};

export default NavMenu;