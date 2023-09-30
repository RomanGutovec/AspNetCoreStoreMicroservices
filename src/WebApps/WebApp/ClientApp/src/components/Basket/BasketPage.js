import React, {useCallback, useEffect, useRef, useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {createBasket, getBasket, updateBasket} from "../api/basketApi";
import {BasketItem} from "./BasketItem";

export function BasketPage({selectedProducts}) {
    debugger;
    const [basket, setBasket] = useState({
        items: [],
        userName: "",
        totalPrice: 0
    });
    const [updatedItems, setUpdatedItems] = useState({}); // Store the locally updated items
    const [totalPrice, setTotalPrice] = useState(0);
    const hasPosted = useRef(false);

    const calculateTotalPrice = useCallback(() => {
        const total = basket.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [basket.items]);

    useEffect(() => {
        const fetchBasketAndUpdate = async () => {
            const basketData = await getBasket();

            setBasket(basketData);

            var mappedProductItemsToBeAdded = selectedProducts.map((i) => ({
                productId: i.id,
                productName: i.name,
                price: i.price,
                color: i.color,
                quantity: 1,
                imageFile: i.imageFile
            }));

            if (basketData.items.length > 0) {

                const updatedBasket = {...basketData, items: mappedProductItemsToBeAdded};
                await updateBasket(updatedBasket);

                setUpdatedItems({});
                setBasket(updatedBasket);
            } else {
                const createdBasket = {
                    userName: "swn",
                    items: mappedProductItemsToBeAdded,
                    totalPrice: mappedProductItemsToBeAdded.reduce((tempSum, item) => tempSum + item.price, 0)
                };
                await createBasket(createdBasket);

                setUpdatedItems({});
                setBasket(createdBasket);

            }
            hasPosted.current = true;
        };

        if (!hasPosted.current) {
            fetchBasketAndUpdate();
        }

    }, [selectedProducts]);

    useEffect(() => {
        calculateTotalPrice();
    }, [basket, updatedItems, calculateTotalPrice]);

    const handleQuantityChange = (productId, quantity) => {
        const updatedItems = basket.items.map((item) => {
            if (item.productId === productId) {
                return {...item, quantity};
            }
            return item;
        });

        setBasket({...basket, items: updatedItems});
        calculateTotalPrice();
    };

    const handleIncrement = (productId) => {
        const updatedItems = basket.items.map((item) => {
            if (item.productId === productId) {
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        });

        setBasket({...basket, items: updatedItems});
        calculateTotalPrice();
    };

    const handleDecrement = (productId) => {
        const updatedItems = basket.items.map((item) => {
            if (item.productId === productId && item.quantity > 1) {
                return {...item, quantity: item.quantity - 1};
            }
            return item;
        });

        setBasket({...basket, items: updatedItems});
        calculateTotalPrice();
    };

    const handleProceedToCheckout = async () => {
        // Merge the locally updated items with the existing basket items
        const mergedItems = basket.items.map((item) => ({
            ...item,
            quantity: updatedItems[item.productId] || item.quantity,
        }));

        // Make the API call to update the basket with the merged items
        const updatedBasket = await updateBasket(mergedItems);

        // Reset the locally updated items and update the basket state
        setUpdatedItems({});
        setBasket(updatedBasket);
    };

    const handleRemoveItem = async (productId) => {
        debugger;

        const updatedItems = basket.items.filter(
            (item) => item.productId !== productId,
        );

        const updatedBasket = {
            ...basket,
            items: updatedItems,
        };

        const basketFromApi = await updateBasket(updatedBasket);
        setBasket(basketFromApi);
    };

    return (
        <div className="basket-page">
            <Container>
                <h1>Basket details</h1>
                {basket.items.length > 0 ? (
                    <>
                        {basket.items.map((product) => (
                            <BasketItem
                                basketItem={product}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem}
                            />
                        ))}
                        <div className="total-price">
                            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                className="p-10"
                                onClick={() => handleProceedToCheckout()}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </>
                ) : (
                    <p>No products chosen yet.</p>
                )}
            </Container>
        </div>
    );
}
