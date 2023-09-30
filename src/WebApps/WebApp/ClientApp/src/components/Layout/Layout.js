import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

const Layout = ({ children, selectedProducts, isLoggedIn, onLogout }) => {
    return (
        <div>
            <NavMenu selectedProducts={selectedProducts} isLoggedIn = {isLoggedIn} logoutHandler = {onLogout} />
            <Container>
                {children}
            </Container>
        </div>
    );
}

export default Layout;