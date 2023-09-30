import {Counter} from "./components/Counter";
import Home from "./components/Home/Home";
import {ProductsPage} from "./components/Products/ProductsPage";
import {BasketPage} from "./components/Basket/BasketPage";
import Login from "./components/Login/Login";

export default function getRoutes(
    handleLogIn,
    handleAddToBasket,
    handleRemoveFromBasket,
    selectedProducts,
) {
    return [
        {
            index: true,
            element: <Home/>,
        },
        {
            path: "/counter",
            element: <Counter/>,
        },
        {
            path: "/products",
            element: (
                <ProductsPage
                    onAddToBasket={handleAddToBasket}
                    onRemoveFromBasket={handleRemoveFromBasket}
                    selectedProducts={selectedProducts}
                />
            ),
        },
        {
            path: "/basket",
            element: <BasketPage selectedProducts={selectedProducts}/>,
        },
        {
            path: "/login",
            element: <Login onLogin={handleLogIn}/>
        },
    ];
}
