import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {getProducts} from "../api/productApi";
import "./ProductList.css";
import {ProductItem} from "./ProductItem";

export function ProductsPage({
                                 onAddToBasket,
                                 onRemoveFromBasket,
                                 selectedProducts,
                             }) {
    const [products, setProducts] = useState([]);
    const [basketItems, setBasketItems] = useState(selectedProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };

        fetchProducts();
    }, []);

    const addToBasket = (product) => {
        onAddToBasket(product);

        if (!basketItems.some((item) => item.id === product.id)) {
            setBasketItems([...basketItems, product]);
        }
    };

    const removeFromBasket = (product) => {
        onRemoveFromBasket(product);
        const filteredBasket = basketItems.filter(
            (basketProduct) => basketProduct.id !== product.id,
        );
        setBasketItems(filteredBasket);
    };

    const isInBasket = (productId) => {
        return basketItems.some((basketProduct) => basketProduct.id === productId);
    };

    return (
        <div className="product-list">
            <Container>
                <Row xs={1} md={4} className="g-4">
                    {products.map((product) => {
                        return (
                            <ProductItem
                                product={product}
                                isInBasket={isInBasket}
                                addToBasket={addToBasket}
                                removeFromBasket={removeFromBasket}
                            />
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}
