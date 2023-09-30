import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export function BasketItem({basketItem, handleIncrement, handleDecrement, handleRemoveItem, handleQuantityChange}) {
    return (
        <div className="basket-item">
            <Card key={basketItem.productId} className="mb-4">
                <Card.Header>{basketItem.productName}</Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-4">
                            <Card.Img
                                variant="top"
                                src={`../images/large_${basketItem.imageFile}`}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-8">
                            <Card.Text>Color: {basketItem.color}</Card.Text>
                            <Card.Text>Price: ${basketItem.price.toFixed(2)}</Card.Text>
                            <label htmlFor={`quantity-${basketItem.productId}`}>
                                Quantity:
                            </label>
                            <div className="w-25">
                                <div className="input-group mb-3">
                                    <Button
                                        variant="secondary"
                                        className="btn-sm"
                                        onClick={() => handleDecrement(basketItem.productId)}
                                    >
                                        -
                                    </Button>
                                    <input
                                        id={`quantity-${basketItem.productId}`}
                                        type="number"
                                        min={1}
                                        value={basketItem.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                basketItem.productId,
                                                parseInt(e.target.value, 10),
                                            )
                                        }
                                        className="form-control form-control-sm "
                                    />
                                    <Button
                                        variant="secondary"
                                        className="btn-sm"
                                        onClick={() => handleIncrement(basketItem.productId)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="danger"
                                onClick={() => handleRemoveItem(basketItem.productId)}
                            >
                                Remove from basket
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
