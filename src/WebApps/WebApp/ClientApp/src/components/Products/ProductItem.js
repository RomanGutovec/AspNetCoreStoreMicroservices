import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ProductList.css";

export function ProductItem({
                                product,
                                isInBasket,
                                removeFromBasket,
                                addToBasket,
                            }) {

    return (
        <Col key={product.id}>
            <Card border="secondary" className="product-card">
                <Card.Header>{product.name}</Card.Header>
                <Card.Body>
                    <Card.Text>{product.summary}</Card.Text>
                    <Card.Img
                        variant="top"
                        src={`../images/${product.imageFile}`}
                        className="product-image"
                    ></Card.Img>
                    <Row>
                        <Button variant="primary">
                            Go to description
                        </Button>
                        {isInBasket(product.id) ? (
                            <Button
                                className="mt-1"
                                variant="danger"
                                onClick={() => removeFromBasket(product)}
                            >
                                Remove from basket
                            </Button>
                        ) : (
                            <Button
                                className="mt-1"
                                variant="primary"
                                onClick={() => addToBasket(product)}
                            >
                                Add to basket
                            </Button>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}
