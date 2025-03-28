import { Link } from "react-router-dom";
import { useState } from "react";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/BackDrop";

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHadler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };
    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHadler}>
                    <span />
                    <span />
                    <span />
                </button>

                <h1 className="main-navigation__title">
                    <Link to="/"> YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;
