import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./custom.css";
import getRoutes from "./AppRoutes";

const App = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logoutHandler = () => {
        debugger;
        setIsLoggedIn(false);
    }

    const loginHandler = (email, password) => {
        setIsLoggedIn(true);
    }

    const handleAddToBasket = (product) => {
        if (!selectedProducts.some((item) => item.id === product.id)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleRemoveFromBasket = (product) => {
        debugger;
        const filteredProducts = selectedProducts.filter(
            (basketProduct) => basketProduct.id !== product.id,
        );
        setSelectedProducts(filteredProducts);
    };

    const routes = getRoutes(
        loginHandler,
        handleAddToBasket,
        handleRemoveFromBasket,
        selectedProducts,
    );

    return (
        <Layout selectedProducts={selectedProducts} onLogout={logoutHandler} isLoggedIn={isLoggedIn}>
            <Routes>
                {routes.map((route, index) => {
                    const {element, ...rest} = route;
                    return <Route key={index} {...rest} element={element}/>;
                })}
            </Routes>
        </Layout>
    );
};

export default App;
